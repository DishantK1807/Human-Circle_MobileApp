import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DelegatekitPage } from './delegatekit';

@NgModule({
  declarations: [
    DelegatekitPage,
  ],
  imports: [
    IonicPageModule.forChild(DelegatekitPage),
  ],
  exports: [
    DelegatekitPage
  ]
})
export class DelegatekitPageModule {}
