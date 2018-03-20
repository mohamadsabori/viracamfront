import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {ProductserviceProvider} from "../../providers/productservice/productservice";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  private value: any;
  constructor(public navCtrl: NavController, private service: ProductserviceProvider) {
    this.service.loadAllProductTypes().subscribe(data => {
      this.value = data;
    }, error => {
      this.value = error;
    })
  }

}
