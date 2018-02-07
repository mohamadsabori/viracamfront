import {ProductProperties} from "./ProductProperties";
export class Product{
  private id: number;
  public name:String;
  public cost: String;
  public description: String;
  public properties: Array<ProductProperties>;


  constructor(id: number, name: String, cost: String, description: String, properties: Array<ProductProperties>) {
    this.id = id;
    this.name = name;
    this.cost = cost;
    this.description = description;
    this.properties = properties;
  }
}
