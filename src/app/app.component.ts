import {Component, ViewChild} from '@angular/core';
import {AlertController, MenuController, Nav, Platform} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HomePage } from '../pages/home/home';
import {MenuOptionModel} from "../shared/side-menu-content/models/menu-option-model";
import {ProductserviceProvider} from "../providers/productservice/productservice";
import {ListPage} from "../pages/list/list";
import {SideMenuSettings} from "../shared/side-menu-content/models/side-menu-settings";
import {CustomerInfoPage} from "../pages/customer-info/customer-info";
import {MyListPage} from "../pages/my-list/my-list";
import {LoginPage} from "../pages/login/login";
import {AboutPage} from "../pages/about/about";
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = LoginPage;

  pages: Array<{ title: string, component: any }>;
  pakages: Array<{ title: string, component: any }> = [];
  public options: Array<MenuOptionModel>;

  constructor(public platform: Platform
    , public statusBar: StatusBar
    , public splashScreen: SplashScreen
    , private service: ProductserviceProvider
    , private menuCtrl: MenuController
    , private alertCtrl: AlertController) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.service.loadAllProductTypes().subscribe(data => {
        this.options = new Array<MenuOptionModel>();
        let productTypes: Array<MenuOptionModel> = [];
        for (let i = 0; i < data.json().length; i++) {
          productTypes.push({iconName: '', displayName: data.json()[i]['categoryName'], component: ListPage, parameter: data.json()[i]['id']})
        }
        this.options.push({
            displayName: 'محصولات',
            subItems: productTypes}
          , {displayName: 'صفحه اصلی', component: HomePage}
          , {displayName: 'سفارش های من', component: MyListPage}
          , {displayName: 'اطلاعات من', component: CustomerInfoPage}
          , {displayName: 'تماس با ما', component: AboutPage}
          // , {displayName: 'اطلاعات من', component: MyinfoPage}
        );
      }, error => {
        this.alertCtrl.create({
          message: 'اتصال به اینترنت را بررسی کنید',
          buttons: [
            {
              text: 'باشه',
              handler: () => {
                this.initializeApp();
              }
            }
          ]
        });

      });
    });
  }

  public sideMenuSettings: SideMenuSettings = {
    accordionMode: true,
    showSelectedOption: true,
    selectedOptionClass: 'active-side-menu-option',
    subOptionIndentation: {
      md: '56px',
      ios: '64px',
      wp: '56px'
    }
  };


  openPage(page) {
    if (page.component === HomePage) {
      this.nav.setRoot(page.component);
    } else {
      this.nav.push(page.component);
    }
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    // this.nav.push() setRoot(page.component);

  }

  public selectOption(option: MenuOptionModel): void {
    this.menuCtrl.close().then(() => {
      if (option.custom && option.custom.isLogin) {
        this.presentAlert('You\'ve clicked the login option!');
      } else if (option.custom && option.custom.isLogout) {
        this.presentAlert('You\'ve clicked the logout option!');
      } else if (option.custom && option.custom.isExternalLink) {
        let url = option.custom.externalUrl;
        window.open(url, '_blank');
      } else {
        // Redirect to the selected page
        if(option.component == ListPage){
          this.nav.push(option.component, {selectedCategory : option.parameter});
        } else{
          if (option.component === HomePage) {
            this.nav.setRoot(option.component);
          } else {
            this.nav.push(option.component);
          }
        }
      }
    });
  }

  public presentAlert(message: string): void {
    let alert = this.alertCtrl.create({
      title: 'Information',
      message: message,
      buttons: ['Ok']
    });
    alert.present();
  }

}
