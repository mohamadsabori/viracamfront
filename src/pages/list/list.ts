import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {ProductserviceProvider} from "../../providers/productservice/productservice";
import {AddorderPage} from "../addorder/addorder";
import {ProductProperties} from "../../model/ProductProperties";
import {ProductItem} from "../../model/productItems";
import {GlobalVariable} from "../../shared/Global";

@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {
  icons: string[];
  public itemCounts: string = '';
  selectedCategory: number;
  items: Array< ProductItem >;
  hasProduct: boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, private productservice: ProductserviceProvider) {
    // If we navigated to this page, we will have an item available as a nav param
    this.selectedCategory = navParams.get('selectedCategory');

    // Let's populate this page with some filler content for funzies
    this.icons = ['cart'];
    this.initializeItems();
  }

  initializeItems(){
    this.productservice.loadAllProductsByCategoryType(this.selectedCategory).subscribe(data => {
        this.items = [];
        this.hasProduct = false;
        for (let i = 0; i < data.json().length; i++) {
          let properties: Array<ProductProperties> = [];
          if(data.json()[i]["properties"] != null && data.json()[i]["properties"].length > 0){
            for (let j = 0; j < data.json()[i]["properties"].length; j++) {
              properties.push({id: data.json()[i]["properties"][j]["id"], value: data.json()[i]["properties"][j]["value"]});
            }
          } else {
            properties = new Array();
          }
          this.items.push({
            title: data.json()[i]["title"] != null ? data.json()[i]["title"] : ""
            ,
            note: data.json()[i]["note"] != null ? data.json()[i]["note"] : ""
            //,  icon: this.icons[Math.floor(Math.random() * this.icons.length)]
            ,
            icon: this.icons[0]
            ,
            id: data.json()[i]["id"]
            ,
            // For test
            /*fileSource: data.json()[i]["fileSource"] != null ? data.json()[i]["fileSource"] : ""*/

            // For release
            fileSource: data.json()[i]["fileSource"] != null ? 'http://176.31.82.40:8080/ViraCamServer/product/files?id=' + data.json()[i]["id"] +
              '&filename=' + data.json()[i]["fileSource"] : "",
            properties: properties,
            qty: 1,
            cost: data.json()[i]["cost"],
            totalPrice: data.json()[i]["cost"]
          });
        }
      }
    );

  }

  itemTapped(event, item) {
    // console.log('value is=' + document.getElementById(item.id).value);
    // item.qty = this.itemCounts;
    // this.itemCounts = '';
    item.qty = 1;
    item.totalPrice = 1 * item.cost;
    var founded: boolean;
    founded = false;
    if(GlobalVariable.savedItems != null && GlobalVariable.savedItems.length > 0){
      for(var i =0;i< GlobalVariable.savedItems.length;i++){
        if(GlobalVariable.savedItems[i].id == item.id){
          GlobalVariable.savedItems[i].qty++;
          GlobalVariable.savedItems[i].totalPrice = GlobalVariable.savedItems[i].qty * item.cost;
          founded = true;
          break;
        }
      }
    }
    if(!founded){
      GlobalVariable.savedItems.push(item);
    }
    // document.getElementById(item.id) = "";
    this.hasProduct = true;
  }

  finishingCart() {
    this.navCtrl.push(AddorderPage, {
      item: GlobalVariable.savedItems
    });
  }

  setOrderTotalPrice(i) {
    this.items[i].totalPrice = this.items[i].qty * this.items[i].cost;
  }

  searchItems(event){
    let val = event.target.value;
    if (val && val.trim() != '') {
      this.items = this.items.filter((item) => {
        return (item.title.toLowerCase().indexOf(val.toLowerCase()) > -1
        || item.properties.filter((property) => {
          return (property.value.toLocaleLowerCase().indexOf(val.toLowerCase())) > -1
          }));
      })
    }
  }
}
