import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {ShoppingPage} from "../pages/shopping/shopping";
import {MyListPage} from "../pages/my-list/my-list";
import {CustomerInfoPage} from "../pages/customer-info/customer-info";
import {HelpPage} from "../pages/help/help";
import {FactordetailsPage} from "../pages/factordetails/factordetails";
import {SideMenuContentComponent} from "../shared/side-menu-content/side-menu-content.component";
import {MyinfoPage} from "../pages/myinfo/myinfo";
import {MyordersPage} from "../pages/myorders/myorders";
import {AddorderPage} from "../pages/addorder/addorder";
import {IonicStorageModule} from "@ionic/storage";
import {ProductserviceProvider} from "../providers/productservice/productservice";
import {HttpModule} from "@angular/http";
import {LoginPage} from "../pages/login/login";

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    AddorderPage,
    MyordersPage,
    MyinfoPage,
    SideMenuContentComponent,
    FactordetailsPage,
    HelpPage,
    CustomerInfoPage,
    MyListPage,
    ShoppingPage,
    LoginPage
  ],
  imports: [
    HttpModule,
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot({
      name: '__mydb',
      driverOrder: ['indexeddb', 'sqlite', 'websql']
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    AddorderPage,
    MyordersPage,
    MyinfoPage,
    FactordetailsPage,
    HelpPage,
    CustomerInfoPage,
    MyListPage,
    ShoppingPage,
    LoginPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ProductserviceProvider
  ]
})
export class AppModule {}
