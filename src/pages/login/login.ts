import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MenuController } from 'ionic-angular';
import { HomePage } from '../home/home';
/**
 * Generated class for the LoginPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public menu:MenuController) {
  }

  ionViewDidLoad() {
    console.log('logged in');
    this.menu.enable(false);
    }
  ionViewDidLeave(){
    this.menu.enable(true);
  }
  login(){
  this.navCtrl.setRoot(HomePage);
  }

}
