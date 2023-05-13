import { Types } from "mongoose";
import { ErrorHTTP } from "../../errors/errors.class";
import { ProductModel } from "../product/product.models";
import { BasketModel } from "./basket.models";
import { ITokenPayload } from "../user/user.types";
import { IDough, IIngredient, IProductModel, ISize } from "../product/product.types";

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
    const product = await ProductModel.findById(productId).exec();

    if (!product) {
      throw new ErrorHTTP(404, "Продукт с таким ID не найден");
    }

    let currentBasket = await BasketModel.findOne({ userId: user.id });
    if (!currentBasket) {
      currentBasket = new BasketModel();
      currentBasket.userId = user.id;
    }

    const productSize = product.sizes.find((prSize) => prSize._id.toString() === size.toString()) ?? null;
    const productDough = product.dough.find((prDough) => prDough._id.toString() === dough.toString()) ?? null;
    const productIngredients = product.ingredients.filter((ing) => ingredients.includes(ing._id.toString()));
    const productIdx = currentBasket.products.findIndex((pr) => pr.product.toString() === productId.toString());

    if (productIdx !== -1) {
      currentBasket.products[productIdx].quantity += 1;
      currentBasket.products[productIdx].totalPrice = this.calculateTotalPriceProduct(product, {
        productSize,
        productDough,
        productIngredients,
        quantity: currentBasket.products[productIdx].quantity,
      });
      currentBasket.products[productIdx].dough = productDough;
      currentBasket.products[productIdx].size = productSize;
      currentBasket.products[productIdx].ingredients = productIngredients;
    } else {
      currentBasket.products.push({
        quantity: 1,
        totalPrice: this.calculateTotalPriceProduct(product, { productSize, productDough, productIngredients }),
        ingredients: productIngredients,
        product: new Types.ObjectId(productId),
        size: productSize,
        dough: productDough,
      });
    }
    console.log(currentBasket, "BASKET");
    await currentBasket.save();
    return currentBasket;
  }

  calculateTotalPriceProduct(
    product: IProductModel,
    {
      productSize,
      productDough,
      productIngredients,
      quantity = 1,
    }: { productSize: ISize | null; productDough: IDough | null; productIngredients: IIngredient[]; quantity?: number }
  ): number {
    const sizePrice = productSize?.price ?? 0;
    const doughPrice = productDough?.price ?? 0;
    let ingredientsPrice = 0;

    if (productIngredients.length) {
      ingredientsPrice = productIngredients.reduce((sum, ing) => sum + ing.price, 0);
    }

    const totalPriceProduct = (product.price || 0) + sizePrice + doughPrice + ingredientsPrice;
    return totalPriceProduct * quantity;
  }
}

const basketService = new BasketService();

export { basketService };
