import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';
import { UsersServiceProvider } from '../../providers/users-service/users-service';
import * as firebase from 'firebase';

import { ToastController } from 'ionic-angular';

/**
 * Generated class for the TeamdetailsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-teamdetails',
  templateUrl: 'teamdetails.html',
  providers: [UsersServiceProvider]
})
export class TeamdetailsPage {
public txt:any;
public usersList:any;
public i:any;
public j:any;
public fbdata:any;
public get:any;

  constructor(public navCtrl: NavController, public navParams: NavParams,public http: Http ,private userservice:UsersServiceProvider,private toastCtrl: ToastController) {
  this.fbdata=firebase.database();

  }
//getting team details from json file and stoting on the firebase database
  addteamsinfirebase(){
  if(this.txt==null){
  alert("Please enter json file url");
  }
  else if(this.txt!=null){
  this.userservice.loadjsonUsers(this.txt.trim()).then(data=>{
  this.usersList=data;
  this.addtodatabase();
  })
  }
  }
  //after fetching team details storing them to database
  addtodatabase(){
  let toast1 = this.toastCtrl.create({
    message: 'Started adding to database....Please Wait',
    duration: 3000,
    position: 'bottom'
  });
  toast1.present();
  //alert("Started adding to database....Please Wait");
  //console.log(this.usersList.length);
  //console.log(this.usersList[0].team.length);
  for(this.j=0;this.j<this.usersList.length;this.j++){
  for(this.i=0;this.i<this.usersList[this.j].team.length;this.i++){
  //console.log(this.usersList[0].team[0]);
  this.fbdata.ref('teamdetails/team'+this.usersList[this.j].team_number+'/team/member'+this.i).set(this.usersList[this.j].team[this.i]);
  }
  this.fbdata.ref('teamdetails/team'+this.usersList[this.j].team_number+'/mentor/').set({contact:this.usersList[this.j].mentor.contact ,link:this.usersList[this.j].mentor.link ,name: this.usersList[this.j].mentor.name});
  alert("Team "+this.usersList[this.j].team_number+" added");
  }
  //alert("All team details are added to database");
  let toast = this.toastCtrl.create({
    message: 'All team details are added to database',
    duration: 3000,
    position: 'bottom'
  });
  toast.present();

  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad TeamdetailsPage');
  }

}
