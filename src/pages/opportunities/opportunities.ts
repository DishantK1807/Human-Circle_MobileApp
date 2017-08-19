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
  selector: 'page-opportunities',
  templateUrl: 'opportunities.html',
  providers: [UsersServiceProvider]
})
export class OpportunitiesPage {

  private db1: any;
  private delegatepg1: any;
  private contarr=[];
  private linkarr=[];
  private headarr=[];

  constructor(public navCtrl: NavController, public navParams: NavParams,private userservice:UsersServiceProvider,public alertCtrl: AlertController) {

    this.db1 = firebase.database().ref('/'); // Get a firebase reference to the root
      this.delegatepg1 = firebase.database().ref('opportunities'); // Get a firebase reference to the homepage
    
  var that= this;
    this.delegatepg1.on("value",function(snappy){
      var i=0;
    snappy.forEach(function(snap){
       
        var links = snap.child('link');
        var content = snap.child('content');
        var head = snap.child('heading');
        that.linkarr[i] = links.val();
        that.contarr[i] = content.val();
        that.headarr[i] = head.val();
        i=i+1;

      }); 
      });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OpportunitiesPage');
  }

}
