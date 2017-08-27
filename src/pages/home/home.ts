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

  private lat1: any; //current users cordinates
  private lon1: any;

  private lat2= 28.689706; //venue's cordinates
  private lon2=77.135647;

  private unit ="K";
  private dist: any;
  

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

onLocateUser(){
  this.geolocation.getCurrentPosition()
    .then(
      (location) => {
        console.log('lat: ' + location.coords.latitude + ', lon: ' + location.coords.longitude);
        console.log('Location fetched successfully');
        this.lat1 = location.coords.latitude;
        this.lon1 = location.coords.longitude;
      }
    )
    .catch(
      (error) => console.log('An error occured.')
    )
}

//function to calculate distance between venue and current users position.
/*
 distance() {
   console.log('inside distance function');
	var radlat1 = Math.PI * this.lat1/180;
	var radlat2 = Math.PI * this.lat2/180;
	var theta = this.lon1-this.lon2;
	var radtheta = Math.PI * theta/180;
	 this.dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
	this.dist = Math.acos(this.dist);
	this.dist = this.dist * 180/Math.PI;
	this.dist = this.dist * 60 * 1.1515;
	if (this.unit=="K") { this.dist = this.dist * 1.609344 };
  if (this.unit=="N") { this.dist = this.dist * 0.8684 };
  console.log(this.dist);
	//return dist
}
*/
 distance() {
        var radlat1 = Math.PI * this.lat1 / 180;
        var radlat2 = Math.PI * this.lon1 / 180;
        var radlon1 = Math.PI * this.lat2 / 180;
        var radlon2 = Math.PI * this.lon2 / 180;
        var theta = this.lon1 - this.lon2;
        var radtheta = Math.PI * theta / 180;
        this.dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
        this.dist = Math.acos(this.dist);
        this.dist = this.dist * 180 / Math.PI;
        this.dist = this.dist * 60 * 1.1515;

        //Get in in kilometers
        this.dist = this.dist * 1.609344;

       // return dist;
    }



}
