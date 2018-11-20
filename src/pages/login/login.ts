import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';
import {HomePage} from "../home/home";
import {Storage} from '@ionic/storage';
import {RegistrationPage} from "../registration/registration";

/**
 * Generated class for the LoginPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  mobile: string;
  password: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, private storage: Storage, private toastCtrl: ToastController) {
  }

  ionViewDidLoad() {

  }

  login(){
    //First get locally user pass and mbile number
    this.storage.get('myPhone');
    this.storage.get('password');

    this.storage.set('myPhone', this.mobile);
    this.storage.set('password', this.password);
    let toast = this.toastCtrl.create({
      message: '    اطلاعات شما با موفقیت ثبت گردید  ',
      duration: 3000,
      position: 'top'
    });
    toast.present();
    this.navCtrl.setRoot(HomePage);
  }

  singUp(){
    this.navCtrl.setRoot(RegistrationPage);
  }

}
