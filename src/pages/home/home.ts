import { Component } from '@angular/core';
import { NavController, NavParams  } from 'ionic-angular';
import { Http } from '@angular/http';
import { LoginPage } from '../login/login';
import { UsersServiceProvider } from '../../providers/users-service/users-service';
import * as firebase from 'firebase';
import { AlertController } from 'ionic-angular';
import {Injectable} from '@angular/core';


@Injectable()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [UsersServiceProvider]
})

export class HomePage {
 
  private heading: any;
  //private content: any;
  private db: any;
  private homepg: any;
  private hchild: any;
  private para1c: any;
  private cont: any;
  //private headarr: string[];
  //private contarr: string[];
  

  constructor(public navCtrl: NavController, public navParams: NavParams,private userservice:UsersServiceProvider,public alertCtrl: AlertController) {
   this.db = firebase.database().ref('/'); // Get a firebase reference to the root
      this.homepg = firebase.database().ref('homepage'); // Get a firebase reference to the homepage
    
    this.homepg.on("value",function(snappy){
    snappy.forEach(function(snap){
       
        var heading = snap.child('heading');
        alert(heading.key + " : "+ heading.val());

        var content = snap.child('content');
        alert(content.key + " : " + content.val());
      }); 
      });// ***ADD THIS LINE***
     
    
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
