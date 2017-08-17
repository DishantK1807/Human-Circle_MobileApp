import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import * as firebase from 'firebase';
/**
 * Generated class for the DelegatekitPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-delegatekit',
  templateUrl: 'delegatekit.html',
})
export class DelegatekitPage {
public input1:any;
public input2:any;
public input3:any;
public input4:any;
public number:any;
public number2:any;
public fbdata:any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  this.number=1;
  this.number2=1;
  this.fbdata=firebase.database();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DelegatekitPage');
  }
  addContent(){
  if (this.number==1){
  this.fbdata.ref('delegatekitcontent/').remove();
  }
  this.fbdata.ref('delegatekitcontent/para'+this.number).set({heading:this.input1,content:this.input2});
  alert("Content for paragraph "+this.number+" added : "+this.input1.trim());
  this.number++;
  }
  addLinks(){
  if (this.number2==1){
  this.fbdata.ref('delegatekitlink/').remove();
  }
  this.fbdata.ref('delegatekitlink/link'+this.number2).set({heading:this.input3,link:this.input4.trim()});
  alert("Link "+this.number2+" added : "+this.input3.trim());
  this.number2++;
  }

}
