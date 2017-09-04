import { Component } from '@angular/core';
import { NavController, NavParams  } from 'ionic-angular';
import { Http } from '@angular/http';
import { LoginPage } from '../login/login';
import { UsersServiceProvider } from '../../providers/users-service/users-service';
import * as firebase from 'firebase';
import { AlertController } from 'ionic-angular';
import {Injectable} from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation';
import { Platform } from 'ionic-angular';

@Injectable()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [UsersServiceProvider],
})

export class HomePage {
 
  
  private db: any;
  private homepg: any;

  private contarr=[];
  private headarr=[];


  constructor(private platform: Platform, public navCtrl: NavController,private geolocation: Geolocation, public navParams: NavParams,private userservice:UsersServiceProvider,public alertCtrl: AlertController) {
   this.db = firebase.database().ref('/'); // Get a firebase reference to the root
      this.homepg = firebase.database().ref('homepage'); // Get a firebase reference to the homepage
    
  var that= this;
    this.homepg.on("value",function(snappy){
      var i=0;
    snappy.forEach(function(snap){
       
        var heading = snap.child('heading');
        var content = snap.child('content');
        that.headarr[i] = heading.val();
        that.contarr[i] = content.val();
        i=i+1;

      }); 
      });
    
     }  


  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
  }

  logUserOut(){
 this.userservice.logoutUser().then(()=>{
this.navCtrl.setRoot(LoginPage);
 });

}



}
