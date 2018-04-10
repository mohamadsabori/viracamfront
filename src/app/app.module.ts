import {BrowserModule} from '@angular/platform-browser';
import {ErrorHandler, NgModule} from '@angular/core';
import {IonicApp, IonicErrorHandler, IonicModule} from 'ionic-angular';
import {SplashScreen} from '@ionic-native/splash-screen';
import {StatusBar} from '@ionic-native/status-bar';

import {MyApp} from './app.component';
import {HomePage} from '../pages/home/home';
import { HttpModule} from "@angular/http";
import {ListPage} from "../pages/list/list";
import {AddorderPage} from "../pages/addorder/addorder";
import {MyordersPage} from "../pages/myorders/myorders";
import {MyinfoPage} from "../pages/myinfo/myinfo";
import {SideMenuContentComponent} from "../shared/side-menu-content/side-menu-content.component";
import {IonicStorageModule} from "@ionic/storage";
import {ProductserviceProvider} from "../providers/productservice/productservice";
import {FactordetailsPage} from "../pages/factordetails/factordetails";

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    AddorderPage,
    MyordersPage,
    MyinfoPage,
    SideMenuContentComponent,
    FactordetailsPage
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
    FactordetailsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ProductserviceProvider
  ]
})
export class AppModule {}
