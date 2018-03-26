import {ProductOrder} from "./ProductOrder";
import {ShippingMethod} from "./ShippingMethod";
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
  constructor(id: number, orderset: Array<ProductOrder>, userFullName: string, userPhoneNumber: string, userAddress: string, shippingMethod: ShippingMethod, totalFactor: number) {
    this.id = id;
    this.orderset = orderset;
    this.userFullName = userFullName;
    this.userPhoneNumber = userPhoneNumber;
    this.userAddress = userAddress;
    this.shippingMethod = shippingMethod;
    this.totalFactor = totalFactor;
  }
}
