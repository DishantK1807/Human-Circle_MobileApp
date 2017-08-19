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
  selector: 'page-delegatekit',
  templateUrl: 'delegatekit.html',
  providers: [UsersServiceProvider]
})

export class DelegatekitPage {

  private db1: any;
  private delegatepg1: any;
  private contarr=[];
  private headarr=[];
  
  private db2: any;
  private delegatepg2: any;
  private headarr2=[];
  private linkarr=[];

  constructor(public navCtrl: NavController, public navParams: NavParams,private userservice:UsersServiceProvider,public alertCtrl: AlertController) {

    this.db1 = firebase.database().ref('/'); // Get a firebase reference to the root
      this.delegatepg1 = firebase.database().ref('delegatekitcontent'); // Get a firebase reference to the homepage
    
  var that= this;
    this.delegatepg1.on("value",function(snappy){
      var i=0;
    snappy.forEach(function(snap){
       
        var heading = snap.child('heading');
        var content = snap.child('content');
        that.headarr[i] = heading.val();
        that.contarr[i] = content.val();
        i=i+1;

      }); 
      });

       //for links
    this.db2 = firebase.database().ref('/'); // Get a firebase reference to the root
      this.delegatepg2 = firebase.database().ref('delegatekitlink'); // Get a firebase reference to the homepage
    
  var that= this;
    this.delegatepg2.on("value",function(snappy){
      var j=0;
    snappy.forEach(function(snap){
       
        var heading2 = snap.child('heading');
        var links = snap.child('link');
        that.headarr2[j] = heading2.val();
        that.linkarr[j] = links.val();
        j=j+1;

      }); 
      });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DelegatekitPage');
  }

}
