
import { Http,RequestOptions,Headers } from '@angular/http';
import {Injectable} from '@angular/core';
import {AddOrder} from "../../model/AddOrder";
import {UserOrder} from "../../model/UserOrder";
import { InAppBrowser } from 'ionic-native';
import {Product} from "../../model/Product";
import {ProductOrder} from "../../model/ProductOrder";
import {ShippingMethod} from "../../model/ShippingMethod";
import {Category} from "../../model/Category";
import {SystemUsers} from "../../model/SystemUsers";
import {Storage} from '@ionic/storage';
import {Observable} from "rxjs";

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
  // public baseUrl: string = 'http://localhost:8080/ViraCamServer';
  // public baseUrl: string = 'http://10.0.2.2:8080/ViraCamServer';
  public baseUrl: string = 'http://176.31.82.40:8080/ViraCamServer';
  // savedItems: Array< ProductItem > = [];
  userOrder: UserOrder;
  currentUser: { userPhoneNumber: "" };

  constructor(private http: Http, private storage: Storage) {

  }

  addUserOrder() {
    // return this.save();
    this.storage.set('myAddress', this.userOrder.userAddress);
    this.storage.set('myUserName', this.userOrder.userFullName);
    this.userPhone = this.userOrder.userPhoneNumber;
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS,PUT');
    let options = new RequestOptions({ headers: headers });
    // let formData: any = new FormData();
    // formData.append('product', 'Hell');
    // return this.http.post(this.baseUrl + '/productorder/adduserorder', this.userOrder);
    // return this.http.post('http://localhost/json.php', this.userOrder, options);
    // let options = new RequestOptions({ headers: headers });
    return this.http.post(this.baseUrl + '/productorder/adduserorder45', this.userOrder);
  }


  save(): Observable<any> {
    let result: Observable<Object>;
    result = this.http. put(this.baseUrl, this.addOrderValue);
    /*if (beer['href']) {
    } else {
      result = this.http.post(this.BEER_API, beer)
    }*/
    return result.catch(error => Observable.throw(error));
  }

  addOrder(selectedItemId: number) {
    this.addOrderValue.productId = selectedItemId;
    this.addOrderValue.userPhoneNumber = this.userPhone;
    let headers = new Headers({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'
      , 'Access-Control-Allow-Methods': 'GET, POST, DELETE, PUT, OPTIONS', 'Access-Control-Allow-Headers': 'X-Requested-With, Content-Type, Authorization, Origin, Accept' });

    let options = new RequestOptions({ headers: headers });
    return this.http.put(this.baseUrl + '/productorder/addorder', this.addOrderValue, options);
    // return this.http.post(this.baseUrl + '/productorder/addorder', this.addOrderValue);
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

  cancelUserOrder (id: any){
    return this.http.post(this.baseUrl + '/userorder/cancelOrder', id);
  }

  payThis (newOrder: UserOrder){
    let param = {'MerchantID' : 'c8edc362-131b-11e9-a316-005056a205be',
    'Amount' : newOrder.totalFactor * 10,
    'Description' : 'فاکتور خرید از ویراکم',
    'Email' : 'mo@viracam.com',
    'Mobile' : newOrder.userPhoneNumber,
    'CallbackURL' : 'http://viracam.com/paymentgateway/verify.php'};
    this.http.post('https://www.zarinpal.com/pg/services/WebGate/wsdl/PaymentRequest', param).subscribe(
      data => {
        var parseData = JSON.parse(JSON.stringify(data));
        if(Number(parseData.Status) === 100){
          var status = true;
          var payUrl = 'https://sandbox.zarinpal.com/pg/StartPay/' + parseData.Authority;
          let browser = new InAppBrowser(payUrl,'_blank');
        }
      }, error2 => {
        console.log(error2);
      }
    );
  }
  itemTapped(item: any) {
    let discounts: number = 0;
    if (this.userOrder == null) {
      this.initiateNewOrder();
    }
    if (this.userOrder.orderset != null && this.userOrder.orderset.length > 0) {
      let found : boolean = false;
      for (var i = 0; i < this.userOrder.orderset.length; i++) {
        if (this.userOrder.orderset[i].product.id == item.id) {
          this.userOrder.orderset[i].qty++;
          if (item.discountCondition != 0 && this.userOrder.orderset[i].qty > item.discountCondition) {
            discounts = (this.userOrder.orderset[i].qty - item.discountCondition) * item.cost * (item.discount / 100);
          }
          this.userOrder.orderset[i].totalPrice = (this.userOrder.orderset[i].qty * item.cost);
          this.userOrder.orderset[i].disCount = discounts;
          found = true;
          break;
        }
      }
      if(!found){
        let newOrder: ProductOrder;
        if (item.discountCondition != 0 && 1 >= item.discountCondition) {
          discounts = item.cost * (item.discount / 100);
        }
        newOrder = new ProductOrder(null, item, new SystemUsers(), '', '', new Category(), 1, item.cost, '', discounts, null);
        this.userOrder.orderset.push(newOrder);
      }
    } else {
      let newOrder: ProductOrder;
      if (item.discountCondition != 0 && 1 >= item.discountCondition) {
        discounts = item.cost * (item.discount / 100);
      }
       let p : Product = new Product(item.id, item.title, item.cost,'',null);
      p.id = item.id;
      newOrder = new ProductOrder(null, p, new SystemUsers(), '', '', new Category(), 1, item.cost, '', discounts, null);
      this.userOrder.orderset.push(newOrder);
    }
    this.hasProduct = true;
    this.setTotalFactor();
  }

  initiateNewOrder() {
    this.userOrder = new UserOrder(null, [], '', '', '', new ShippingMethod(), 0, null, null, null, '', '', '');
    this.storage.get('myPhone').then((val) => {
      this.userOrder.userPhoneNumber = val;
    });
    this.storage.get('myUserName').then((val) => {
      this.userOrder.userFullName = val;
    });
    this.storage.get('myAddress').then((val) => {
      this.userOrder.userAddress = val;
    });
  }

  itemTappedByIndex(qty: any, indx: any) {
    let discounts: number = 0;
    this.userOrder.orderset[indx].qty = qty;
    if (parseInt(this.userOrder.orderset[indx].product.discountCondition) != 0 && 1 >= parseInt(this.userOrder.orderset[indx].product.discountCondition)) {
      discounts = qty * parseInt(this.userOrder.orderset[indx].product.cost) * (parseInt(this.userOrder.orderset[indx].product.discount) / 100);
    }
    console.log(parseInt(this.userOrder.orderset[indx].product.cost));
    this.userOrder.orderset[indx].totalPrice = (this.userOrder.orderset[indx].qty * parseInt(this.userOrder.orderset[indx].product.cost));
    this.userOrder.orderset[indx].disCount = discounts;
    this.setTotalFactor();
  }

  deleteThisRow(key: any) {
    this.userOrder.orderset.splice(key, 1);
    this.setTotalFactor();
  }

  setTotalFactor() {
    this.userOrder.totalFactor = 0;
    for (var i = 0; i < this.userOrder.orderset.length; i++) {
      this.userOrder.totalFactor += this.userOrder.orderset[i].totalPrice - this.userOrder.orderset[i].disCount;
    }
  }

  addUser(systemUsers: SystemUsers){
    return this.http.post(this.baseUrl + '/users/adduser', systemUsers);
  }
}
