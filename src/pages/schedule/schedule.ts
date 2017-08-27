import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';
import { LoginPage } from '../login/login';
import { UsersServiceProvider } from '../../providers/users-service/users-service';
import * as firebase from 'firebase';
import { AlertController } from 'ionic-angular';
import {Injectable} from '@angular/core';

@IonicPage()
@Component({
  selector: 'page-schedule',
  templateUrl: 'schedule.html',
  providers: [UsersServiceProvider]
})

export class SchedulePage {

  
  private db1: any;
  private delegatepg1: any;
  private descarr=[];
  private timearr=[];
  private dayarr=[];

  constructor(public navCtrl: NavController, public navParams: NavParams,private userservice:UsersServiceProvider,public alertCtrl: AlertController) {

    this.db1 = firebase.database().ref('/'); // Get a firebase reference to the root
      this.delegatepg1 = firebase.database().ref('schedule'); // Get a firebase reference to the homepage
    
  var that= this;
  var j=0;var k=1;
    this.delegatepg1.on("value",function(snappy){
      
      var i=0;
    snappy.forEach(function(snap1){
     
       snap1.forEach(function(snap){
         that.dayarr[j]=k;
        var desc = snap.child('description');
        var time = snap.child('time'); 
        that.descarr[i] = desc.val();
        that.timearr[i] = time.val();
        i=i+1;
        j=j+1;
       });
      k=k+1;
      }); 
      
      });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SchedulePage');
  }

}
