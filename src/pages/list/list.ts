import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {ProductserviceProvider} from "../../providers/productservice/productservice";
import {AddorderPage} from "../addorder/addorder";
import {ProductProperties} from "../../model/ProductProperties";
import {ProductItem} from "../../model/productItems";

@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {
  icons: string[];
  public itemCounts: string = '';
  selectedCategory: number;
  items: Array< ProductItem >;


  constructor(public navCtrl: NavController, public navParams: NavParams, private productservice: ProductserviceProvider) {
    // If we navigated to this page, we will have an item available as a nav param
    this.selectedCategory = navParams.get('selectedCategory');

    // Let's populate this page with some filler content for funzies
    this.icons = ['cart'];
    this.initializeItems();
  }

  initializeItems() {
    this.productservice.loadAllProductsByCategoryType(this.selectedCategory).subscribe(data => {
        this.items = [];
        for (let i = 0; i < data.json().length; i++) {
          let properties: Array<ProductProperties> = [];
          if (data.json()[i]["properties"] != null && data.json()[i]["properties"].length > 0) {
            for (let j = 0; j < data.json()[i]["properties"].length; j++) {
              properties.push({
                id: data.json()[i]["properties"][j]["id"],
                value: data.json()[i]["properties"][j]["value"]
              });
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
            fileSource: data.json()[i]["fileSource"] != null ? this.productservice.baseUrl + '/product/files?id=' + data.json()[i]["id"] +
              '&filename=' + data.json()[i]["fileSource"] : "",
            properties: properties,
            qty: 1
            , cost: data.json()[i]["cost"]
            , totalPrice: data.json()[i]["cost"]
            , discountCondition: data.json()[i]["discountCondition"] != null ? data.json()[i]["discountCondition"] : 0
            , discount: data.json()[i]["discount"] != null ? data.json()[i]["discount"] : 0
          });
        }
      }
    );

  }

  itemTapped(event, item) {
    this.productservice.itemTapped(item);
    /*item.totalPrice = 1 * item.cost;
    var founded: boolean;
    founded = false;
    this.productservice.itemTapped(item);
    if(this.productservice.savedItems != null && this.productservice.savedItems.length > 0){
      for(var i =0;i< this.productservice.savedItems.length;i++){
        if(this.productservice.savedItems[i].id == item.id){
          this.productservice.savedItems[i].qty++;
          let discounts: number = 0;
          if(item.discountCondition != 0 && this.productservice.savedItems[i].qty > item.discountCondition){
            discounts = (this.productservice.savedItems[i].qty - item.discountCondition) * item.cost * (item.discount / 100);
          }
          this.productservice.savedItems[i].totalPrice = (this.productservice.savedItems[i].qty * item.cost) - discounts;
          this.productservice.savedItems[i].discount = discounts;
          founded = true;
          break;
        }
      }
    }
    if(!founded){
      //this.productservice.savedItems.push(item);
      let discount: number = 0;
      if(item.discount == 1){
        discount = item.cost * (item.discount / 100)
      }
      this.productservice.savedItems.push({
            title: item.title,note: item.note, icon: this.icons[0], id: item.id , fileSource: item.fileSource, properties: item.properties,
            qty: item.qty, cost: item.cost, totalPrice: item.totalPrice - discount,discountCondition: item.discountCondition, discount: item.discount
          });
    }
    // document.getElementById(item.id) = "";
    this.productservice.hasProduct = true;*/
  }

  finishingCart() {
    this.navCtrl.push(AddorderPage);
  }

  setOrderTotalPrice(i) {
    let discounts: number = 0;
    if(this.items[i].discountCondition != 0 && this.items[i].qty > this.items[i].discountCondition){
      discounts = (this.items[i].qty - this.items[i].discountCondition) * (this.items[i].discount / 100);
    }
    this.items[i].totalPrice = (this.items[i].qty * this.items[i].cost) - discounts;
    // this.items[i].totalPrice = this.items[i].qty * this.items[i].cost;
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
