import { FilterItemModel, FilterModel } from "./filter.models";

class FilterController {
  async create(req: any, res: any, next: any) {
    try {
      const { title } = req.body;
      const createdFilterParent = await FilterModel.create({
        title,
      });

      return res.json(createdFilterParent);
    } catch (e) {
      next(e);
    }
  }

  async createFilterItem(req: any, res: any, next: any) {
    try {
      const { title, parent } = req.body;
      const createdFilterItem = await FilterItemModel.create({
        title,
        parent,
      });
      return res.json(createdFilterItem);
    } catch (e) {
      console.log(e);
    }
  }

  async getAll(req: any, res: any, next: any) {
    const items = await FilterModel.find().populate("items").exec();
    return res.json(items);
  }

  async getAllItem(req: any, res: any, next: any) {
    const { parent } = req.query;
    let items;
    if (parent) {
      items = await FilterItemModel.find({ parent }).populate("parent").exec();
    } else {
      items = await FilterItemModel.find().populate("parent").exec();
    }
    return res.json(items);
  }

  async updateFilter(req: any, res: any, next: any) {
    const { id } = req.params;
    console.log("update");
    const updatedFilterParent = await FilterModel.findByIdAndUpdate(
      id,
      req.body,
      {
        new: true,
      }
    ).exec();
    return res.json(updatedFilterParent);
  }

  async updateFilterItem(req: any, res: any, next: any) {
    const { id } = req.params;

    const updatedFilterItem = await FilterItemModel.findByIdAndUpdate(
      id,
      req.body,
      {
        new: true,
      }
    ).exec();
    return res.json(updatedFilterItem);
  }

  async deleteOne(req: any, res: any, next: any) {
    const { id } = req.params;
    // const isValidId = Types.ObjectId.isValid(id);
    // if (!isValidId) {
    //   throw new ErrorHTTP(400, "Некорректный id продукта");
    // }
    await FilterModel.findByIdAndDelete(id).exec();
  }
}

const filterController = new FilterController();

export { filterController };
