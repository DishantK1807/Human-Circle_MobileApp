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
public input1:any;
public input2:any;
public input3:any;
public number:any;
public fbdata:any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  this.number=1;
  this.fbdata=firebase.database();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OpportunitiesPage');
  }
  addlinks(){
  if (this.number==1){
  this.fbdata.ref('opportunities/').remove();
  }
  this.fbdata.ref('opportunities/opportunity'+this.number).set({heading:this.input1,content:this.input2,link:this.input3.trim()});
  alert("opportunity "+this.number+" added : "+this.input1.trim());
  this.number++;
  }
}
