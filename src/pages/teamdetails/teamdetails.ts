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
  private members=[];
  private flag:any;
  private mname:any;
  private mcontact:any;
  private mlink:any;

  constructor(private platform: Platform, public navCtrl: NavController,private geolocation: Geolocation, public navParams: NavParams,private userservice:UsersServiceProvider,public alertCtrl: AlertController) {
  var myUserId = firebase.auth().currentUser.uid; //current user id

    this.db = firebase.database().ref('/'); // Get a firebase reference to the root
      this.homepg = firebase.database().ref('teamdetails'); // Get a firebase reference to the homepage
    
  var that= this;
    this.homepg.on("value",function(snappy){
      var i=0;
    snappy.forEach(function(snapi){
       var lmentor = snapi.child('mentor');
       
       var lteam = snapi.child('team');
         var j=0; that.flag=0;
          lteam.forEach(function(m){
              that.members[j]=m.val();
                  if (m.val()==myUserId)
                    {
                      that.flag=1;
                    }
                  j=j+1;
             });

          if(that.flag==1) /////loop for mentor details
            { var t=0;
              lmentor.forEach(function(n){
                that.mentors[t] = n.val();
                t=t+1;
              });
            }

          if (that.flag==1) /////loop for team members user ids
            { var k=0; 
              while(j>=1)
                {console.log(that.members[k]);
                  
              k=k+1; j=j-1;}
              return;
            }
      
                   
          /*  if (m.val()==myUserId)
              { 
                console.log('Team found');
              }
          */
        });
        i=i+1;

      }); 
      //});
   // });
    
     }  

  ionViewDidLoad() {
    console.log('ionViewDidLoad TeamdetailsPage');
  }

}
