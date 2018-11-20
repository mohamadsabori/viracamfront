import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Storage} from '@ionic/storage';
import {ProductserviceProvider} from "../../providers/productservice/productservice";
import {UserOrder} from "../../model/UserOrder";
import {ShoppingPage} from "../shopping/shopping";

/**
 * Generated class for the MyListPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-my-list',
  templateUrl: 'my-list.html',
})
export class MyListPage {
  orders: Array<UserOrder>;
  msg: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private service: ProductserviceProvider, private storage: Storage) {
  }

  ionViewDidLoad() {
    this.storage.get('myPhone').then((val) => {
      this.service.loadMyOrders(val).subscribe(
        data => {
          this.orders = data.json();
          this.msg = data.json();
        }, error => {
          this.msg = error;
          console.log(error);
        });
    });
  }

  openFactorDetails(userOrder: UserOrder) {
    this.navCtrl.push(ShoppingPage, {"item": userOrder});
  }

}
