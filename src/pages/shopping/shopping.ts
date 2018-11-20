import { Component } from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams} from 'ionic-angular';
import {UserOrder} from "../../model/UserOrder";
import {ProductserviceProvider} from "../../providers/productservice/productservice";

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

  constructor(public navCtrl: NavController, public navParams: NavParams, private alertCtrl: AlertController
    , private service: ProductserviceProvider) {
    this.newOrder = this.navParams.get("item");
  }

  ionViewDidLoad() {
  }

  removeThis(id: any){

}

}
