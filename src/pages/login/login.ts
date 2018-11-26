import { Component } from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';
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
  myUserName : string;
  myPassword : string;
  constructor(public navCtrl: NavController, public navParams: NavParams, private storage: Storage, private toastCtrl: ToastController
  , private alertCtrl: AlertController) {
    this.storage.get('myPhone').then((val) => {
      this.myUserName = val;
      this.storage.get('password').then((val) => {
        this.myPassword = val;
        if(this.myUserName != null && this.myUserName != "" && this.myPassword != null && this.myPassword != ""){
          this.navCtrl.setRoot(HomePage);
        }
      });
    });
  }

  ionViewDidLoad() {

  }

  login(){

    //First get locally user pass and mbile number

    this.storage.get('myPhone').then((val) => {
      this.myUserName = val;
      this.storage.get('password').then((val) => {
        this.myPassword = val;
        if(this.myUserName != this.mobile || this.myPassword != this.password){
           let alert = this.alertCtrl.create({
           title: 'خطا',
           message: 'نا کاربری یا کلمه عبو اشتباه می باشد',
           buttons: ['Ok']
           });
           alert.present();
        }else{
          let toast = this.toastCtrl.create({
            message: '    اطلاعات شما با موفقیت ثبت گردید  ',
            duration: 3000,
            position: 'top'
          });
          toast.present();
          this.navCtrl.setRoot(HomePage);
        }
      });
    });
  }

  singUp(){
    this.navCtrl.setRoot(RegistrationPage);
  }

}
