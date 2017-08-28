import { Component } from '@angular/core';
import { IonicPage, NavController, ModalController, AlertController, NavParams, LoadingController } from 'ionic-angular';
import { MenuController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { UsersServiceProvider } from '../../providers/users-service/users-service';
import { Geolocation } from '@ionic-native/geolocation';
import { Platform } from 'ionic-angular';
import * as firebase from 'firebase';

import { Http } from '@angular/http';
import {Injectable} from '@angular/core';


@Injectable()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  providers: [UsersServiceProvider]
})

export class LoginPage {
        public emailfield:any;
        public passfield:any;
        private users=[];
        private usersList:any;
        private db: any;
        private homepg: any;

        private lat1: any; //current users cordinates
        private lon1: any;

        private lat2:any; //venue's cordinates
        private lon2:any;

        private unit ="K";
        private dist: any;

  constructor(private geolocation: Geolocation,private platform: Platform,public navCtrl: NavController, public navParams: NavParams, public menu:MenuController,private alertController:AlertController ,private userservice:UsersServiceProvider, private loadingController: LoadingController) 
  {
    this.db = firebase.database().ref('/'); // Get a firebase reference to the root
      this.homepg = firebase.database().ref('venuemaplocation'); // Get a firebase reference to the homepage
    
  var that= this;

    this.homepg.on("value",function(snappy){

    snappy.forEach(function(snap){
       
        var lattitude = snap.child('latt');
       var longitude = snap.child('long');
        that.lat2 = lattitude.val();
        that.lon2 = longitude.val();
  
     
      }); 
      });

  }

  getval(){
    
     this.onLocateUser();
    
  }

  onLocateUser(){
  this.geolocation.getCurrentPosition()
    .then(
      (location) => {
        console.log('user lat: ' + location.coords.latitude + ', lon: ' + location.coords.longitude);
        console.log('Location fetched successfully');
        this.lat1 = location.coords.latitude;
        this.lon1 = location.coords.longitude;
        this.distance();
      }
    )
    .catch(
      (error) => console.log('An error occured.')
    )
}

 distance() {

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

  this.checkdist();
}


//checks if displacement of user is in bounds then login 
checkdist(){
  
if (this.dist<10)       //condition for checking if user is near venue
  { this.submitLogin() }
else
  alert("NOT IN RANGE! GET CLOSER TO VENUE TO BE ABLE TO LOG IN.")
}


  signUserUp(){
  this.userservice.signupUser(this.emailfield,this.passfield).then(authData=>{
   
    this.navCtrl.setRoot(HomePage);
  },error=>{
  //alert('error logging in '+error.message);
  });
  let loader =this.loadingController.create({
  dismissOnPageChange:true,
  });
  //loader.present();
  }


 submitLogin(){
  this.userservice.loginUser(this.emailfield,this.passfield).then(authData=>{

    this.navCtrl.setRoot(HomePage);
  },error=>{
  //alert('error logging in '+error.message);
  let alert = this.alertController.create({
     title: 'Error logging in',
     subTitle: error.message,
     buttons: ['Dismiss']
   });
   alert.present();
  });
  let loader =this.loadingController.create({
  dismissOnPageChange: true,
  });
  //loader.present();
  }




  listOurUsers(){
  this.userservice.loadUser()
  .then(data=>{
  this.usersList=data;
  })
 }


 

  ionViewDidLoad() {
    console.log('logged in'); 
    this.menu.enable(false);
    }
  ionViewDidLeave(){
    this.menu.enable(true);
  }


  login(){
  this.navCtrl.setRoot(HomePage);
  }




}
