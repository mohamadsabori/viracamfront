import {Product} from './Product';
import {SystemUsers} from './SystemUsers';
import {Category} from './Category';
export class ProductOrder{
  private id: number;
  public product : Product;
  private user: SystemUsers;
  private orderDate: String;
  private orderTime: String;
  private orderStatus: Category;
  qty : number;
  totalPrice : number;

  constructor(id: number, product: Product, user: SystemUsers, orderDate: String, orderTime: String, orderStatus: Category, qty : number, totalPrice : number) {
    this.id = id;
    this.product = product;
    this.user = user;
    this.orderDate = orderDate;
    this.orderTime = orderTime;
    this.orderStatus = orderStatus;
    this.qty = qty;
    this.totalPrice = totalPrice;
  }
}
