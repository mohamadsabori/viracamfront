import { Component } from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';
import {UserOrder} from "../../model/UserOrder";
import {ProductserviceProvider} from "../../providers/productservice/productservice";
import {HomePage} from "../home/home";

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
  constructor(public navCtrl: NavController, public navParams: NavParams,private alertCtrl: AlertController
    ,private service: ProductserviceProvider,private toastCtrl: ToastController) {
    this.newOrder = this.navParams.get("item");
  }

  ionViewDidLoad() {

  }
  presentConfirm(id: any) {
    let alert = this.alertCtrl.create({
      title: 'Vira',
      message: 'فاکتور حذف شود؟',
      buttons: [
        {
          text: 'خیر',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'بلی',
          handler: () => {
            this.service.cancelUserOrder(id).subscribe(
              data => {
                let toast = this.toastCtrl.create({
                  message: '    سفارش شما با موفقیت لغو گردید  ',
                  duration: 3000,
                  position: 'top'
                });
                toast.present();
                this.navCtrl.setRoot(HomePage);
              }, error2 => {
                console.log(error2);
              }
            );
          }
        }
      ]
    });
    alert.present();
  }

}
