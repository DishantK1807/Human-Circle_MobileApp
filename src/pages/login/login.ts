import { Component } from '@angular/core';
import { IonicPage, NavController, ModalController, AlertController, NavParams, LoadingController } from 'ionic-angular';
import { MenuController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { UsersServiceProvider } from '../../providers/users-service/users-service';
import { Geolocation } from '@ionic-native/geolocation';
import { Platform } from 'ionic-angular';

/**
 * Generated class for the LoginPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
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
  private lat1: any; //current users cordinates
  private lon1: any;

  private lat2= 28.689706; //venue's cordinates
  private lon2=77.135647;

  private unit ="K";
  private dist: any;

  constructor(private geolocation: Geolocation,private platform: Platform,public navCtrl: NavController, public navParams: NavParams, public menu:MenuController,private alertController:AlertController ,private userservice:UsersServiceProvider, private loadingController: LoadingController) {
//getting json generated dynamic users and displaying them on login page
  //this.listOurUsers();
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
  listOurUsers(){
  this.userservice.loadUser()
  .then(data=>{
  this.usersList=data;
  })

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
onLocateUser(){
  this.geolocation.getCurrentPosition()
    .then(
      (location) => {
        console.log('lat: ' + location.coords.latitude + ', lon: ' + location.coords.longitude);
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
  this.checkdist();
}

//checks if displacement of user is in bounds then login 
checkdist(){
if (this.dist<5)
  { this.submitLogin() }
else
  alert("NOT IN RANGE! GET CLOSER TO VENUE TO BE ABLE TO LOG IN.")
}

}
