import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import * as firebase from 'firebase';

/**
 * Generated class for the OpportunitiesPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-opportunities',
  templateUrl: 'opportunities.html',
})
export class OpportunitiesPage {
//public url:any;
//public fbdata:any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  //this.fbdata=firebase.database().ref('links');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OpportunitiesPage');
  }
 // addlinks(){
 // this.fbdata.set({link:this.url.trim()});
 // alert("link added:"+this.url.trim());
 // }
}
