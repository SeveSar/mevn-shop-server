import { Types } from 'mongoose';

import { IFilterItemDTO, IFilterItemModel, IFilterModel } from './filter.types';
import { IProductModel } from '../product/product.types';

export class FilterDTO {
  title: string;
  id: Types.ObjectId;
  items: IFilterItemDTO[];
  constructor(model: IFilterModel) {
    this.title = model.title;
    this.items = model.items;
    this.id = model._id;
  }
}

export class FilterItemDTO {
  title: string;
  id: Types.ObjectId;
  products: IProductModel[];
  parent: Types.ObjectId;
  constructor(model: IFilterItemModel) {
    this.title = model.title;
    this.products = model.products;
    this.id = model._id;
    this.parent = model.parent;
  }
}
