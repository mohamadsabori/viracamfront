import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';
import {ProductserviceProvider} from "../../providers/productservice/productservice";
import {ProductProperties} from "../../model/ProductProperties";
import {Storage} from '@ionic/storage';
import {ShippingMethod} from "../../model/ShippingMethod";
import {UserOrder} from "../../model/UserOrder";
import {Product} from "../../model/Product";
import {Category} from "../../model/Category";
import {SystemUsers} from "../../model/SystemUsers";
import {ProductOrder} from "../../model/ProductOrder";

/**
 * Generated class for the AddorderPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-addorder',
  templateUrl: 'addorder.html',
})
export class AddorderPage {
  shippingMethod: Array<ShippingMethod>;
  selectedItem: Array<{ title: string, note: string, icon: string, id: number, fileSource: string, properties: Array<ProductProperties>, qty: number }>;
  newOrder: UserOrder;
  savedData: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private service: ProductserviceProvider, private storage: Storage, private toastCtrl: ToastController) {
    this.shippingMethod = [];
    this.selectedItem = navParams.get('item');
    this.newOrder = new UserOrder(0, [], '', '', '', new ShippingMethod());
    for (let i = 0; i < this.selectedItem.length; i++) {
      this.newOrder.orderset.push(new ProductOrder(0,new Product(this.selectedItem[i].id,'','','',this.selectedItem[i].properties),new SystemUsers(),'','',new Category()));
      // , userFullName: '', userPhoneNumber: '',userAddress: '', shippingMethod: new ShippingMethod(), id: -1});
    }
    this.storage.get('myPhone').then((val) => {
      this.newOrder.userPhoneNumber = val;
    });
    this.storage.get('myUserName').then((val) => {
      this.newOrder.userFullName = val;
    });
    this.storage.get('myAddress').then((val) => {
      this.newOrder.userAddress = val;
    });

    service.loadAllshippingMethods().subscribe(data => {
      this.shippingMethod = data.json();
    }, error => {
      console.log(error);
    });
  }

  addOrder() {
    console.log(this.selectedItem);
    this.service.addUserOrder(this.newOrder).subscribe(
      data => {
        this.savedData = data.json();
        let toast = this.toastCtrl.create({
          message: '    سفارش شما با موفقیت ثبت گردید  ',
          duration: 3000,
          position: 'top'
        });
        toast.present();
      }, error2 => {
        console.log(error2);
      }
    );
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddorderPage');
  }

}
