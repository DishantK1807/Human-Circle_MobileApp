import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';
import { LoginPage } from '../login/login';
import { UsersServiceProvider } from '../../providers/users-service/users-service';
import * as firebase from 'firebase';
import { AlertController } from 'ionic-angular';
import {Injectable} from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation';
import { Platform } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-teamdetails',
  templateUrl: 'teamdetails.html',
})


export class TeamdetailsPage {

    private db: any;
  private homepg: any;

  private mentors=[];
  private fields=[];
  private members=[];
  private flag:any;

  //variables for displaying info
  private userFname=[];
  private userLname=[];
  private userEmail=[];

  private userNumber=[];
  

  constructor(private platform: Platform, public navCtrl: NavController,private geolocation: Geolocation, public navParams: NavParams,private userservice:UsersServiceProvider,public alertCtrl: AlertController) {
  var myUserId = firebase.auth().currentUser.uid; //current user id

    this.db = firebase.database().ref('/'); // Get a firebase reference to the root
      this.homepg = firebase.database().ref('teamdetails'); // Get a firebase reference to the homepage
    
  var that= this; that.flag=0;
  that.fields[0]='Name';
  that.fields[1]='Link';
  that.fields[2]='Contact No.' ;
    this.homepg.on("value",function(snappy){
      
      var i=0;
    snappy.forEach(function(snapi){
     
      if (that.flag==1)
        {return;}
      that.members=[];
       var lmentor = snapi.child('mentor');      
       var lteam = snapi.child('team');
         var j=0; 
          lteam.forEach(function(m){
              that.members[j]=m.val();
                  if (m.val()==myUserId)
                    {
                      that.flag=1;
                    }
                  j=j+1;
             });

             

          if(that.flag==1) /////loop for mentor details
            { var t=2;
              lmentor.forEach(function(n){
                that.mentors[t] = n.val();
                
                t=t-1;
              });
            }

          if (that.flag==1) /////loop for team members user ids
            { var k=0; 
              
              that.members.forEach(function(member){
                that.userservice.viewUser(member).then(snapshot => {
                  that.userFname[k]=snapshot.val().firstname;
                  that.userLname[k]=snapshot.val().lastname;
                  that.userNumber[k]=snapshot.val().number;
                  that.userEmail[k]=snapshot.val().email;
                  k=k+1;
                });
              }) 
                }
                   
         
        });
        i=i+1;

      }); 
    
     }  

  ionViewDidLoad() {
    console.log('ionViewDidLoad TeamdetailsPage');
  }

}
