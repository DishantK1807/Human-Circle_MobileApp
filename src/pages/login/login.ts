import { Component } from '@angular/core';
import { IonicPage, NavController, ModalController, AlertController, NavParams, LoadingController } from 'ionic-angular';
import { MenuController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { UsersServiceProvider } from '../../providers/users-service/users-service';

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
  constructor(public navCtrl: NavController, public navParams: NavParams, public menu:MenuController,private alertController:AlertController ,private userservice:UsersServiceProvider, private loadingController: LoadingController) {
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

}
