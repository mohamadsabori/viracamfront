import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';
import {Storage} from '@ionic/storage';
import {LoginPage} from "../login/login";
import {ProductserviceProvider} from "../../providers/productservice/productservice";
import {SystemUsers} from '../../model/SystemUsers';

/**
 * Generated class for the RegistrationPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-registration',
  templateUrl: 'registration.html',
})
export class RegistrationPage {
  mobile: string;
  password: string;
  repeatePassword: string;
  systemUsers: SystemUsers;

  constructor(public navCtrl: NavController, public navParams: NavParams
    , private storage: Storage, private toastCtrl: ToastController, private productservice: ProductserviceProvider) {
  }

  ionViewDidLoad() {
  }

  singUp(){
    if(this.password != this.repeatePassword){

    } else {
      this.storage.set('myPhone', this.mobile);
      this.storage.set('password', this.password);
      let toast = this.toastCtrl.create({
        message: '    اطلاعات شما با موفقیت ثبت گردید  ' + '\t' + this.mobile+ '\t' + this.password,
        duration: 3000,
        position: 'top'
      });
      toast.present();
      this.navCtrl.setRoot(LoginPage);
    }
  }


}
