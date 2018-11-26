import {ProductProperties} from "./ProductProperties";
import {ProductImages} from "./ProductImages";
export class Product{
  public id: number;
  public name:String;
  public cost: String;
  public description: String;
  public properties: Array<ProductProperties>;
  public productImages: Array<ProductImages>;

  constructor(id: number, name: String, cost: String, description: String, properties: Array<ProductProperties>) {
    this.id = id;
    this.name = name;
    this.cost = cost;
    this.description = description;
    this.properties = properties;
  }
  constructor(id: number, name: String, cost: String, description: String, properties: Array<ProductProperties>, productImages: Array<ProductImages>) {
    this.id = id;
    this.name = name;
    this.cost = cost;
    this.description = description;
    this.properties = properties;
    this.productImages = productImages;
  }
}
