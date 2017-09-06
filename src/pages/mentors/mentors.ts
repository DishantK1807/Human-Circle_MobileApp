import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import * as firebase from 'firebase';
/**
 * Generated class for the MentorsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-mentors',
  templateUrl: 'mentors.html',
})
export class MentorsPage {
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
    console.log('ionViewDidLoad MentorsPage');
  }
  //adding mentors to the firebase database
  addMentors(){
  if (this.number==1){
  this.fbdata.ref('mentors/').remove();
  }
  this.fbdata.ref('mentors/mentor'+this.number).set({name:this.input1,content:this.input2,link:this.input3.trim()});
  alert("Mentor "+this.number+" added : "+this.input1.trim());
  this.number++;
  }

}
