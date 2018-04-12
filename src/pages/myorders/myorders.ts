import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {ProductserviceProvider} from "../../providers/productservice/productservice";
import {UserOrder} from "../../model/UserOrder";
import {FactordetailsPage} from "../factordetails/factordetails";
import {Storage} from '@ionic/storage';

/**
 * Generated class for the MyordersPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-myorders',
  templateUrl: 'myorders.html',
})
export class MyordersPage {
  orders: Array<UserOrder>;

  constructor(public navCtrl: NavController, public navParams: NavParams, private service: ProductserviceProvider, private storage: Storage) {

  }

  ionViewDidLoad() {
    this.storage.get('myPhone').then((val) => {
      this.service.loadMyOrders(val).subscribe(
        data => {
          this.orders = data.json();
        }, error => {
          console.log(error);
        });
    });
  }

  openFactorDetails(userOrder: UserOrder) {
    this.navCtrl.push(FactordetailsPage, {"item": userOrder});
  }
}
