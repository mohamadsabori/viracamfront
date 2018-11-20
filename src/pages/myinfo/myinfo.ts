import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the MyordersPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-myinfo',
  templateUrl: 'myinfo.html',
})
export class MyinfoPage {
  private myPhone: string;
  private myUserName: string;
  private myAddress: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, private storage: Storage) {

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
  }
  saveUserInfo() {
    this.storage.set('myPhone',this.myPhone);
    this.storage.set('myUserName',this.myUserName);
    this.storage.set('myAddress',this.myAddress);
  }

}
