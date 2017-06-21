import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PersonalinfoPage } from './personalinfo';

@NgModule({
  declarations: [
    PersonalinfoPage,
  ],
  imports: [
    IonicPageModule.forChild(PersonalinfoPage),
  ],
  exports: [
    PersonalinfoPage
  ]
})
export class PersonalinfoPageModule {}
