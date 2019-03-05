import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, ToastController, Platform, AlertController} from 'ionic-angular';
import {ProductserviceProvider} from "../../providers/productservice/productservice";
import {Storage} from '@ionic/storage';
import {ShippingMethod} from "../../model/ShippingMethod";
import {UserOrder} from "../../model/UserOrder";
import {ProductItem} from "../../model/productItems";
import {HomePage} from "../home/home";
import { InAppBrowser } from 'ionic-native';
import {Categories} from "../../model/Categories";

/**
 * Generated class for the AddorderPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-addorder',
  templateUrl: 'addorder.html',
})
export class AddorderPage {
  shippingMethod: Array<ShippingMethod> = [];
  selectedItem: Array<ProductItem> = [];
  newOrder: UserOrder;
  savedData: any;
  showInfo: boolean = false;
  payedId: string = Categories.ORDER_PAIED;

  constructor(public navCtrl: NavController, public navParams: NavParams, private service: ProductserviceProvider, private storage: Storage
	, private toastCtrl: ToastController, private platform: Platform
  ,public alertController: AlertController) {
    service.loadAllshippingMethods().subscribe(data => {
      this.shippingMethod = data.json();
    }, error => {
      console.log(error);
    });
  }

  addOrder() {
    this.service.addUserOrder().subscribe(
      data => {
        this.savedData = data.json();

        let toast = this.toastCtrl.create({
          message: '    سفارش شما با موفقیت ثبت گردید  ',
          duration: 3000,
          position: 'top'
        });
        toast.present();
        this.service.initiateNewOrder();
        this.navCtrl.setRoot(HomePage);
      }, error2 => {
        console.log(error2);
      }
    );
  }

  ionViewDidLoad() {
  }

  async deleteThisRow(key: any) {
    const alert = await this.alertController.create({
      message: 'مایل به حذف این ردیف هستید',
      buttons: [
        {
          text: 'خیر',
          role: 'cancel',
          cssClass: 'secondary'
        }, {
          text: 'بله',
          handler: () => {
            this.service.deleteThisRow(key);
          }
        }
      ]
    });

    await alert.present();
  }

  setOrderTotalPrice(i: any) {
    let discounts: number = 0;
    if(this.selectedItem[i].discountCondition != 0 && this.selectedItem[i].qty > this.selectedItem[i].discountCondition){
      discounts = (this.selectedItem[i].qty - this.selectedItem[i].discountCondition) * (this.selectedItem[i].discount / 100);
    }
    this.selectedItem[i].totalPrice = (this.selectedItem[i].qty * this.selectedItem[i].cost) - discounts;
  }
  showCustomerInfo(){
    this.showInfo = true;
  }

  payOrder() {
    this.service.addUserOrder().subscribe(
      data => {
        this.savedData = data.json();
        let toast = this.toastCtrl.create({
          message: '    سفارش شما با موفقیت ثبت گردید  ',
          duration: 3000,
          position: 'top'
        });
        toast.present();
        this.service.initiateNewOrder();
        this.navCtrl.setRoot(HomePage);
        let browser = new InAppBrowser("http://viracam.com/paymentgateway/new/send.php?amount="
        + (this.savedData.totalFactor) + "&mobile=" + this.savedData.userPhoneNumber
        + "&factorNumber=" + this.savedData.orderSerial
        + "&itemId=" + this.savedData.id
        + "&description" +
        "=فاکتور خرید از ویراکم بابت فاکتور " + this.savedData.orderSerial + " تاریخ " + this.savedData.orderDate
        + " جناب آقای/خانم " + this.savedData.userFullName + " شماره تلفن " + this.savedData.userPhoneNumber
        , '_blank');
      }, error2 => {
        let toast = this.toastCtrl.create({
          message: error2,
          duration: 3000,
          position: 'top'
        });
        toast.present();
      }
    );
  }
  setNewQty(qty: any, i: any){
    this.service.itemTappedByIndex(qty, i);
  }

  ionViewWillLeave() {
    if(!this.service.hasProduct){
      this.service.initiateNewOrder();
    }
  }
}
