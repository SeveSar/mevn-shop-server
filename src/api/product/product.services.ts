import { ProductDTO } from "./product.dtos";
import { ErrorHTTP } from "./../../errors/errors.class";
import { ProductModel } from "./product.models";
import { IProduct } from "./product.types";

export class ProductServices {
  async create(product: IProduct) {
    const newItem = await ProductModel.create({
      ...product,
    });
    const productDTO = new ProductDTO(newItem);
    return productDTO;
  }

  async findOne(id: string) {
    const item = await ProductModel.findById(id).exec();
    if (!item) {
      throw new ErrorHTTP(404, "Продукт не найден");
    }
    return item;
  }
  async findAll(req: any) {
    const { filters } = req.query;
    let items;
    if (filters) {
      items = await ProductModel.find({
        filters: {
          $in: filters,
        },
      })
        .populate("category")
        .populate("filters")
        .exec();
    } else {
      items = await ProductModel.find();
    }
    return items.map((item) => new ProductDTO(item));
  }
  async update(id: string, updateObject: any) {
    try {
      const newItem = await ProductModel.findByIdAndUpdate(id, updateObject, {
        new: true,
      }).exec();
      return newItem;
    } catch (e) {
      throw e;
    }
  }
  async delete(id: string) {
    try {
      await ProductModel.findByIdAndDelete(id).exec();
    } catch (e) {
      throw e;
    }
  }
}

const productService = new ProductServices();
export { productService };
