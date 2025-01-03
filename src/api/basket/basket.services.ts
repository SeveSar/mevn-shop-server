import { UserDTO } from './../user/user.dto';
import { Types } from 'mongoose';
import { ErrorHTTP } from '../../errors/errors.class';
import { ProductModel } from '../product/product.models';
import { BasketModel, BasketProductModel } from './basket.models';
import { UserAuthRequest, ITokenPayload, ICart } from '../user/user.types';
import { IDough, IDoughModel, IIngredient, IProductModel, ISize, ISizeModel } from '../product/product.types';
import { IBasketProductModel } from './basket.types';

class BasketService {
  async add({
    productId,
    dough,
    size,
    ingredients,
    user,
  }: {
    productId: string;
    dough: string;
    size: string;
    ingredients: string[];
    user: ITokenPayload;
  }) {
    const productDb = await ProductModel.findById(productId).exec();

    if (!productDb) {
      throw new ErrorHTTP(404, 'Продукт с таким ID не найден');
    }

    let currentBasket = await BasketModel.findOne({ user: user.id });
    if (!currentBasket) {
      currentBasket = new BasketModel();
      currentBasket.user = user.id;
    }

    const productSize = productDb.sizes.find((prSize) => prSize._id.toString() === size.toString()) as ISizeModel;
    const productDough = productDb.dough.find((prDough) => prDough._id.toString() === dough.toString()) as IDoughModel;
    const productIngredients = productDb.ingredients.filter((ing) => ingredients.includes(ing._id.toString()));

    let productBasket = await BasketProductModel.findOne({ basket: currentBasket._id, product: productId });

    if (productBasket) {
      productBasket.quantity = productBasket.quantity + 1;
      productBasket.totalPrice = this.calculateTotalPriceProduct(productDb, {
        productSize,
        productDough,
        productIngredients,
      });
      productBasket.dough = productDough;
      productBasket.size = productSize;
      productBasket.ingredients = productIngredients;
      await productBasket.save();
    } else {
      const newBasketProduct = await BasketProductModel.create({
        basket: currentBasket._id,
        quantity: 1,
        totalPrice: this.calculateTotalPriceProduct(productDb, { productSize, productDough, productIngredients }),
        ingredients: productIngredients,
        product: new Types.ObjectId(productId),
        size: productSize,
        dough: productDough,
      });
      currentBasket.products.push(newBasketProduct._id);
    }

    await currentBasket.save();
    return currentBasket;
  }

  async getByUserId(userId: Types.ObjectId) {
    const basket = await BasketModel.findOne({ user: userId })
      .populate({
        path: 'products',
        populate: { path: 'product' },
      })
      .exec();

    if (!basket) throw new ErrorHTTP(404, 'Корзина не найдена');
    return basket;
  }

  async updateProduct({
    user,
    productId,
    updatedProduct,
  }: {
    user: Types.ObjectId;
    productId: string;
    updatedProduct: IBasketProductModel;
  }) {
    const basketItem = await BasketModel.findOne({ user }).populate('products').exec();
    if (!basketItem) throw new ErrorHTTP(404, 'Корзина не найдена');

    const basketProduct = await BasketProductModel.findOne({ basket: basketItem._id, product: productId }).exec();

    if (!basketProduct) throw new ErrorHTTP(404, 'Продукт не найден в корзине');
    basketProduct.quantity = updatedProduct.quantity;

    await basketProduct.save();
    return basketItem.save();
  }

  async removeProduct({ userId, productId }: { userId: Types.ObjectId; productId: string }) {
    const basketBd = await BasketModel.findOne({ user: userId });
    if (!basketBd) throw new ErrorHTTP(404, 'Корзина не найдена');
    const productBasket = await BasketProductModel.findOne({ basket: basketBd._id, product: productId }).exec();
    if (!productBasket) throw new ErrorHTTP(404, 'Продукт не найден в корзине');

    basketBd.products = basketBd.products.filter((ids) => productBasket._id.toString() === ids.toString());
    await productBasket.remove();
    await basketBd.save();
    return basketBd;
  }

  calculateTotalPriceProduct(
    product: IProductModel,
    {
      productSize,
      productDough,
      productIngredients,
    }: { productSize: ISize | null; productDough: IDough | null; productIngredients: IIngredient[] }
  ): number {
    const sizePrice = productSize?.price ?? 0;
    const doughPrice = productDough?.price ?? 0;
    let ingredientsPrice = 0;

    if (productIngredients.length) {
      ingredientsPrice = productIngredients.reduce((sum, ing) => sum + ing.price, 0);
    }

    const totalPriceProduct = (product.price || 0) + sizePrice + doughPrice + ingredientsPrice;
    return totalPriceProduct;
  }

  async createOrUpdateBasket(userDTO: UserDTO, cart?: ICart[],) {
    if (!cart) return;

    let candidateBasket = await BasketModel.findOne({
      user: userDTO._id,
    }).exec();

    const productCartIds = cart.map((item) => item.id);

    if (!candidateBasket) {
      candidateBasket = new BasketModel();
      candidateBasket.user = userDTO._id;
    }
    const [productsDb, productsBasket] = await Promise.all([
      ProductModel.find({ _id: { $in: productCartIds } }),
      BasketProductModel.find({ basket: candidateBasket._id, product: { $in: productCartIds } }),
    ]);
    for (let i = 0; i < cart.length; i++) {
      const item = cart[i];

      const productBasket = productsBasket.find((pr) => pr.product.toString() === item.id.toString());

      const productDb = productsDb.find((pr) => pr._id.toString() === item.id.toString());

      if (!productDb) continue;

      const productIngredients = productDb.ingredients.filter((ing) =>
        item.ingredients.find((cartIng: any) => cartIng.id.toString() === ing._id.toString())
      );
      const productSize = productDb.sizes.find(
        (prSize) => prSize._id.toString() === item.size.id.toString()
      ) as ISizeModel;

      const productDough = productDb.dough.find(
        (prDough) => prDough._id.toString() === item.dough.id.toString()
      ) as IDoughModel;

      if (productBasket) {
        productBasket.quantity = item.quantity;
        productBasket.totalPrice = basketService.calculateTotalPriceProduct(productDb, {
          productSize,
          productIngredients,
          productDough,
        });
        productBasket.ingredients = productIngredients;
        productBasket.dough = productDough;
        productBasket.size = productSize;
        productBasket.save();
      } else {
        const newBasketProduct = await BasketProductModel.create({
          basket: candidateBasket._id,
          quantity: item.quantity,
          totalPrice: basketService.calculateTotalPriceProduct(productDb, {
            productSize,
            productDough,
            productIngredients,
          }),
          ingredients: productIngredients,
          product: new Types.ObjectId(item.id),
          size: productSize,
          dough: productDough,
        });
        candidateBasket.products.push(newBasketProduct._id);
      }
    }

    return await candidateBasket.save();
  }
}

const basketService = new BasketService();

export { basketService };
