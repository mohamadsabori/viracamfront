import {ProductProperties} from "./ProductProperties";
import {ProductImages} from "./ProductImages";
import {ProductCategory} from "./productCategory";
export class Product{
  id:number;
  name:String;
  cost:string;
  description:String;
  productCode:String;
  productProperties:Array<ProductProperties>;
  category: ProductCategory;
  enable:boolean;
  discountCondition:string;
  discount:string;
  productImages: Array<ProductImages>;

  /*  public id: number;
  public name:String;
  public cost: String;
  public description: String;
  public properties: Array<ProductProperties>;
  public productImages: Array<ProductImages>;*/

  constructor(id: number, name: String, cost: string, description: String, properties: Array<ProductProperties>) {
    this.id = id;
    this.name = name;
    this.cost = cost;
    this.description = description;
    this.productProperties = properties;
  }
}
