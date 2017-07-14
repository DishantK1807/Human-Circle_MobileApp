import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { VenuemapPage } from './venuemap';

@NgModule({
  declarations: [
    VenuemapPage,
  ],
  imports: [
    IonicPageModule.forChild(VenuemapPage),
  ],
  exports: [
    VenuemapPage
  ]
})
export class VenuemapPageModule {}
