import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import {FactordetailsPage} from "./factordetails";

@NgModule({
  declarations: [
    FactordetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(FactordetailsPage),
  ],
})
export class FactordetailsPageModule {}
