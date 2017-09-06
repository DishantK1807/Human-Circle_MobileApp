import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import * as firebase from 'firebase';
declare var cordova: any;

/**
 * Generated class for the SchedulePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-schedule',
  templateUrl: 'schedule.html',
})
export class SchedulePage {
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
    console.log('ionViewDidLoad SchedulePage');
  }
  //adding day 1 events' details to firebase database
  dayoneevents(){
  if (this.number==1){
  this.fbdata.ref('schedule/day1/').remove();
  }
  this.fbdata.ref('schedule/day1/timeslot'+this.number).set({time:this.input1,description:this.input2});
  alert("Day 1 event "+this.number+" added for "+this.input1.trim());
  this.number++;
  }

  //adding day 2 events' details to firebase database
  daytwoevents(){
  if (this.number2==1){
  this.fbdata.ref('schedule/day2/').remove();
  }
  this.fbdata.ref('schedule/day2/timeslot'+this.number2).set({time:this.input3,description:this.input4});
  alert("Day 1 event "+this.number2+" added for "+this.input1.trim());
  this.number2++;
  }
  }
