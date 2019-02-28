import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';
import { Storage } from '@ionic/storage';
import {HomePage} from "../home/home";

/**
 * Generated class for the CustomerInfoPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-customer-info',
  templateUrl: 'customer-info.html',
})
export class CustomerInfoPage {
  private myPhone: string;
  private myUserName: string;
  private myAddress: string;
  private userFullName: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, private storage: Storage, private toastCtrl: ToastController) {
  }

  ionViewDidLoad() {
    this.storage.get('myPhone').then((val) => {
      this.myPhone = val;
    });
    this.storage.get('myUserName').then((val) => {
      this.myUserName = val;
    });
    this.storage.get('myAddress').then((val) => {
      this.myAddress = val;
    });
    this.storage.get('userFullName').then((val) => {
      this.userFullName = val;
    });
  }
  saveUserInfo() {
    this.storage.set('myPhone',this.myPhone);
    this.storage.set('myUserName',this.myUserName);
    this.storage.set('myAddress',this.myAddress);
    this.storage.set('userFullName',this.userFullName);
    let toast = this.toastCtrl.create({
      message: '    اطلاعات شما با موفقیت ثبت گردید  ',
      duration: 3000,
      position: 'top'
    });
    toast.present();
  }

}
