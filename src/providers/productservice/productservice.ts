import {Http, Headers} from '@angular/http';
import {Injectable} from '@angular/core';
import {AddOrder} from "../../model/AddOrder";
import {UserOrder} from "../../model/UserOrder";
import {ProductItem} from "../../model/productItems";
/*
 Generated class for the ProductserviceProvider provider.

 See https://angular.io/guide/dependency-injection for more info on providers
 and Angular DI.
 */
@Injectable()
export class ProductserviceProvider {
  hasProduct: boolean = false;
  private addOrderValue: AddOrder = new AddOrder();
  private userPhone: string = '';
  // public baseUrl: String = '/ViraCam';
  public baseUrl: String = 'http://176.31.82.40:8080/ViraCamServer';
  savedItems: Array< ProductItem > = [];
  currentUser: { userPhoneNumber: "" };

  constructor(public http: Http) {
  }

  addOrder(selectedItemId: number) {
    this.addOrderValue.productId = selectedItemId;
    this.addOrderValue.userPhoneNumber = this.userPhone;
    return this.http.post(this.baseUrl + '/productorder/addorder', this.addOrderValue);
    // return this.http.post(this.baseUrl + '/productorder/addorder', selectedItemId);
  }

  loadAllProducts() {
    return this.http.get(this.baseUrl + '/product/loadAllProductsForClient');
  }

  loadMyOrders(val) {
    let myHeaders = new Headers();
    myHeaders.set('Content-Type', 'application/json');
    myHeaders.set('Accept', 'text/plain');
    let myParams = new URLSearchParams();
    myParams.set('userPhone', this.userPhone);
    // let options = new RequestOptions({headers: myHeaders, params: myParams});

      this.userPhone = val;

    return this.http.get(this.baseUrl + '/userorder/loaduserorders/' + this.userPhone);

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
    this.userPhone = userOrder.userPhoneNumber;
    return this.http.post(this.baseUrl + '/productorder/adduserorder', userOrder);
  }

  cancelUserOrder (id: any){
    return this.http.post(this.baseUrl + '/userorder/cancelOrder', id);
  }

  payItem(newOrder: UserOrder) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('CURLOPT_SSL_VERIFYHOST', false);
    headers.append('CURLOPT_SSL_VERIFYPEER', false);
    headers.append('CURLOPT_RETURNTRANSFER', true);
    return this.http.post('https://pay.ir/pg/send', {
      api: 'cc5de67db7a42f90908edee5012084aa',
      amount: newOrder.totalFactor,
      redirect: this.baseUrl + '/productorder/userOrderPaid?id' + newOrder.id,
      mobile: newOrder.userPhoneNumber,
      factorNumber: newOrder.id,
      description: 'خرید از ویراکم'
    }).subscribe(
      data => {
        if (data.status == '1') {
          this.http.get('https://pay.ir/pg/' + data.token)
        } else if (data.status == '0') {
          console.log(data.errorCode);
          console.log(data.errorMessage);
        }
      }, error2 => {
        console.log(error2);
      }
    );
  }
}
