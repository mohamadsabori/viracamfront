import {Http, Headers} from '@angular/http';
import {Injectable} from '@angular/core';
import {AddOrder} from "../../model/AddOrder";
import {UserOrder} from "../../model/UserOrder";

/*
 Generated class for the ProductserviceProvider provider.

 See https://angular.io/guide/dependency-injection for more info on providers
 and Angular DI.
 */
@Injectable()
export class ProductserviceProvider {
  private addOrderValue: AddOrder = new AddOrder();
  private userPhone: string = '09124850689';
  public baseUrl: String = '/ViraCam';
  currentUser: { userPhoneNumber: "09124850689" };

  constructor(public http: Http) {
    console.log('Hello ProductserviceProvider Provider');
  }

  addOrder(selectedItemId: number) {
    this.addOrderValue.productId = selectedItemId;
    this.addOrderValue.userPhoneNumber = this.userPhone;
    console.log('selectedItemId=' + selectedItemId);
    let headersp = new Headers({
      'Content-Type': 'application/json'
    });
    console.log(this.addOrderValue);
    return this.http.post(this.baseUrl + '/productorder/addorder', this.addOrderValue);
    // return this.http.post(this.baseUrl + '/productorder/addorder', selectedItemId);
  }

  loadAllProducts() {
    return this.http.get(this.baseUrl + '/product/loadAllProductsForClient');
  }

  loadMyOrders() {
    let myHeaders = new Headers();
    myHeaders.set('Content-Type', 'application/json');
    myHeaders.set('Accept', 'text/plain');
    let myParams = new URLSearchParams();
    myParams.set('userPhone', this.userPhone);
    // let options = new RequestOptions({headers: myHeaders, params: myParams});
    return this.http.get(this.baseUrl + '/productorder/loaduserorders/' + this.userPhone);
  }

  loadAllProductTypes() {
    return this.http.get(this.baseUrl + '/product/loadAllProductTypes');
    // return this.http.get('assets/mokdata/product-category.json');
  }

  loadAllProductsByCategoryType(selectedCategory: number) {
    return this.http.get(this.baseUrl + '/product/loadAllProductsForClientByCategoryType/' + selectedCategory);
    // return this.http.get('assets/mokdata/products.json');
  }

  loadAllshippingMethods() {
    return this.http.get(this.baseUrl + '/product/loadAllshippingMethods/');
    // return this.http.get('assets/mokdata/shippingMethods.json');
  }

  addUserOrder (userOrder: UserOrder){
    return this.http.post(this.baseUrl + '/productorder/adduserorder', userOrder);
  }
}
