import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LoginPage } from './login';
import { IonicModule } from 'ionic-angular';

@NgModule({
  declarations: [
    LoginPage,
  ],
  imports: [
    IonicModule.forRoot(LoginPage, {
            scrollPadding: false,
            scrollAssist: true,
            autoFocusAssist: false
        }),
    IonicPageModule.forChild(LoginPage),
  ],
  exports: [
    LoginPage
  ]
  
})
export class LoginPageModule {}
