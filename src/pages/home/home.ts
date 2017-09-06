import { Component } from '@angular/core';
import { NavController,Loading,LoadingController } from 'ionic-angular';
import { Http } from '@angular/http';
import { LoginPage } from '../login/login';
import { PopoverController } from 'ionic-angular';
import { UsersServiceProvider } from '../../providers/users-service/users-service';
import * as firebase from 'firebase';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [UsersServiceProvider]
})
export class HomePage {
public csvItems:any;
public txt:any;
public email:any;
public pass:any;
public userId:any;
private i:any;
private j:any;
private users;
private usersList:any;
public input1:any;
public input2:any;
public number:any;
public fbdata:any;
loading: Loading;

  constructor(public navCtrl: NavController,public http: Http ,private userservice:UsersServiceProvider,public loadingCtrl: LoadingController) {
this.userId=firebase.auth().currentUser.uid;
this.number=1;
this.fbdata=firebase.database();
  }
  ionViewWillEnter(){
  //this.loadCSV();
  }
  //getting users from json file using function in the provider
  addusersinfirebase(){
  if(this.txt==null){
  alert("Please enter json file url");
  }
  else {
  this.userservice.loadjsonUsers(this.txt).then(data=>{
  this.usersList=data;
  this.text2();
  },error=>{
  alert('error in adding users'+error.message);
  })
  }
  }
  //after reading users and their info from the json file storing it in the firebase database
  text2(){
  //alert("Started adding to database");
  this.loading = this.loadingCtrl.create({
  content: 'Started adding to database'
  });
  this.loading.present();
  for(this.i=0;this.i<=(this.usersList.length-1);this.i++){
  //signing up users (Authentication in firebase) with the json details and adding the details of user in database
  this.userservice.addUsers(this.usersList[this.i].email.trim(),this.usersList[this.i].login.password.trim(),this.usersList[this.i].phone.trim(' '),this.usersList[this.i].login.username.trim(),this.usersList[this.i].name.first.trim(),this.usersList[this.i].name.last.trim(),this.usersList[this.i].gender.trim()).then(authData=>{
  this.loading.dismiss();
  alert('Json users added :'+this.i);
  },error=>{
  this.loading.dismiss();
  alert('error in adding users'+error.message);
  });
  }
  }
  //adding paragraphs and the contents (to be displayed on homepage) to the firebase database
  addContent(){
  if (this.number==1){
  this.fbdata.ref('homepage/').remove();
  }
  this.fbdata.ref('homepage/para'+this.number).set({heading:this.input1,content:this.input2});
  alert("Para  "+this.number+" added : "+this.input1.trim());
  this.number++;
  }
//logging out the current user
  logUserOut(){
   this.userservice.logoutUser().then(()=>{
  this.navCtrl.setRoot(LoginPage);
   });

}
}
