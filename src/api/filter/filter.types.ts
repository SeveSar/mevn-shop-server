import { IProductModel } from '../product/product.types';
import { Types } from 'mongoose';

interface IFilterItem {
  title: string;
  products: IProductModel[];
  parent: Types.ObjectId;
}
interface IFilter {
  title: string;
  items: IFilterItemDTO[];
}

export interface IFilterItemModel extends IFilterItem {
  _id: Types.ObjectId;
}

export interface IFilterItemDTO extends IFilterItem {
  id: Types.ObjectId;
}

export interface IFilterModel extends IFilter {
  _id: Types.ObjectId;
}

export interface IFilterDTO extends IFilter {
  id: Types.ObjectId;
}
