import { Component } from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams, Platform} from 'ionic-angular';
import {UserOrder} from "../../model/UserOrder";
import {ProductserviceProvider} from "../../providers/productservice/productservice";
import { InAppBrowser } from 'ionic-native';
import {HomePage} from "../home/home";
import {Categories} from "../../model/Categories";
/**
 * Generated class for the ShoppingPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-shopping',
  templateUrl: 'shopping.html',
})
export class ShoppingPage {

  newOrder: UserOrder;
  payedId: string = Categories.ORDER_PAIED;
  constructor(public navCtrl: NavController, public navParams: NavParams, private alertCtrl: AlertController
    , private service: ProductserviceProvider, private platform: Platform) {
    this.newOrder = this.navParams.get("item");
  }

  ionViewDidLoad() {
  }

  removeThis(id: any){}

  payThis(){
    this.platform.ready().then(() => {
      // this.service.payThis(this.newOrder);
      let browser = new InAppBrowser("http://viracam.com/paymentgateway/new/send.php?amount="
        + (this.newOrder.totalFactor) + "&mobile=" + this.newOrder.userPhoneNumber
        + "&factorNumber=" + this.newOrder.id 
        + "&itemId=" + this.newOrder.id
        + "&description" +
        "=فاکتور خرید از ویراکم بابت فاکتور " + this.newOrder.orderSerial + " تاریخ " + this.newOrder.orderDate
        + " جناب آقای/خانم " + this.newOrder.userFullName + " شماره تلفن " + this.newOrder.userPhoneNumber
        ,'_blank');
        this.navCtrl.setRoot(HomePage);
    });
  }

}
