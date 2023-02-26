import { ErrorHTTP } from "./../../errors/errors.class";
import { CategoryModel } from "./category.models";
import { ICategory } from "./category.types";

export class CategoryService {
  async create(product: ICategory) {
    try {
      const newItem = await CategoryModel.create(product);
      return newItem;
    } catch (e: any) {
      throw new Error(e);
    }
  }

  async findOne(id: string) {
    const item = await CategoryModel.findById(id).populate("products");
    if (!item) {
      throw new ErrorHTTP(404, "Категория не найдена");
    }
    return item;
  }
  async findAll() {
    const items = await CategoryModel.find().populate("products");
    return items;
  }
  async update(id: string, updateObject: any) {
    try {
      const newItem = await CategoryModel.findByIdAndUpdate(id, updateObject, {
        new: true,
      });
      return newItem;
    } catch (e) {
      throw e;
    }
  }
  async delete(id: string) {
    try {
      await CategoryModel.findByIdAndDelete(id);
    } catch (e) {
      throw e;
    }
  }
}

const categoryService = new CategoryService();
export { categoryService };
