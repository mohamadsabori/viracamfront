import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {UserOrder} from "../../model/UserOrder";

/**
 * Generated class for the FactordetailsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-factordetails',
  templateUrl: 'factordetails.html',
})
export class FactordetailsPage {
  newOrder: UserOrder;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.newOrder = this.navParams.get("item")
  }

  ionViewDidLoad() {

  }

}
