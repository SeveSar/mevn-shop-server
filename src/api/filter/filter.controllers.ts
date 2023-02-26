import { FilterModel } from "./filter.models";

class FilterController {
  async create(req: any, res: any, next: any) {
    try {
      const { title, values } = req.body;
      const createdFilterItem = await FilterModel.create({
        title,
        values,
      });

      return res.json(createdFilterItem);
    } catch (e) {
      next(e);
    }
  }

  async getAll(req: any, res: any, next: any) {
    const items = await FilterModel.find().exec();
    return res.json(items);
  }
}

const filterController = new FilterController();

export { filterController };
