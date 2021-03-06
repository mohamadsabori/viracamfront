import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {ProductserviceProvider} from "../../providers/productservice/productservice";
import {ListPage} from "../list/list";
import {MyordersPage} from "../myorders/myorders";
import {HelpPage} from "../help/help";
import {AddorderPage} from "../addorder/addorder";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  private value: any;
  private ipCameraId: any;
  private aHdId: any;
  private accessoriesId: any;
  private radioId: any;
  private connectorId: any;
  private securityId: any;
  private learningId: any;

  constructor(public navCtrl: NavController, private service: ProductserviceProvider) {
    this.service.loadAllProductTypes().subscribe(data => {
      for (let i = 0; i < data.json().length; i++) {
        if(data.json()[i].code === 'IP'){
          this.ipCameraId = data.json()[i].id;
        }
        if(data.json()[i].code === 'AHD'){
          this.aHdId = data.json()[i].id;
        }
        if(data.json()[i].code === 'Accessories'){
          this.accessoriesId = data.json()[i].id;
        }
        if(data.json()[i].code === 'Radio'){
          this.radioId = data.json()[i].id;
        }
        if(data.json()[i].code === 'Connector'){
          this.connectorId = data.json()[i].id;
        }
        if(data.json()[i].code === 'Security'){
          this.securityId = data.json()[i].id;
        }
        if(data.json()[i].code === 'Learning'){
          this.learningId = data.json()[i].id;
        }

      }
    }, error => {
      this.value = error;
    })
  }
  openIpCamera(event) {
    this.navCtrl.push(ListPage, {selectedCategory: this.ipCameraId});

  }
  openAhdCamera(event, selectedPassedCategory: any) {
    this.navCtrl.push(ListPage, {selectedCategory: selectedPassedCategory});

  }
  openAccessoriesId(event) {
    this.navCtrl.push(ListPage, {selectedCategory: this.accessoriesId});
  }

  openMyOrder(event){
    this.navCtrl.push(MyordersPage);
  }

  openHelpPage(event){
    this.navCtrl.push(HelpPage);
  }

  finishingCart() {
    this.navCtrl.push(AddorderPage);
  }

}
