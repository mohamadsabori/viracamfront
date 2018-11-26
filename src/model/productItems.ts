import {ProductProperties} from "./ProductProperties";
export class ProductItem {
  cost: number;
  title: string;
  note: string;
  icon: string;
  id: number;
  fileSource: string;
  properties: Array<ProductProperties>;
  qty: number;
  totalPrice: number;
  constructor() {

  }
}
