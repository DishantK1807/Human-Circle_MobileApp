import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';
import { UsersServiceProvider } from '../../providers/users-service/users-service';
import * as firebase from 'firebase';

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
private usersList:any;

  constructor(public navCtrl: NavController, public navParams: NavParams,public http: Http ,private userservice:UsersServiceProvider) {
  }

  addteamsinfirebase(){
  if(this.txt==null){
  alert("Please enter json file url");
  }
  else if(this.txt!=null){
  this.userservice.loadjsonUsers(this.txt.trim()).then(data=>{
  this.usersList=data;
  this.addtodatabase();
  });
  }
  }
  addtodatabase(){
  alert("Started adding to database....Please Wait");
    
  //for(this.i=0;this.i<=(this.usersList.length-1);this.i++){
  //this.userservice.addUsers(this.usersList[this.i].email.trim(),this.usersList[this.i].login.password.trim(),this.usersList[this.i].phone.trim(' '),this.usersList[this.i].login.username.trim(),this.usersList[this.i].name.first.trim(),this.usersList[this.i].name.last.trim(),this.usersList[this.i].gender.trim()).then(authData=>{
  //alert('Json users added :'+this.i);
  //},error=>{
  //alert('error in adding users'+error.message);
  //});
  //}
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad TeamdetailsPage');
  }

}
