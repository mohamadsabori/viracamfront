import {ProductOrder} from "./ProductOrder";
import {ShippingMethod} from "./ShippingMethod";
import {Category} from "./Category";
/**
 * Created by msabori on 1/31/18.
 */
export class UserOrder {
  id: number;
  orderset: Array<ProductOrder>;
  userFullName: string;
  userPhoneNumber: string;
  userAddress: string;
  shippingMethod: ShippingMethod;
  totalFactor: number;
  orderDate: string;
  orderTime: string;
  orderStatus: Category;
  orderSerial: string;
  shippingMethodDetails: string;
  constructor(id: number, orderset: Array<ProductOrder>, userFullName: string, userPhoneNumber: string, userAddress: string, shippingMethod: ShippingMethod, totalFactor: number
    , orderDate: string, orderTime: string, orderStatus: Category, orderSerial: string, shippingMethodDetails: string) {
    this.id = id;
    this.orderset = orderset;
    this.userFullName = userFullName;
    this.userPhoneNumber = userPhoneNumber;
    this.userAddress = userAddress;
    this.shippingMethod = shippingMethod;
    this.totalFactor = totalFactor;
    this.orderDate = orderDate;
    this.orderTime = orderTime;
    this.orderStatus = orderStatus;
    this.orderSerial = orderSerial;
    this.shippingMethodDetails = shippingMethodDetails;
  }
}
