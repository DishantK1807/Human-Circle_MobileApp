import { Component,NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import * as firebase from 'firebase';
import { ToastController } from 'ionic-angular';

/**
 * Generated class for the VenuemapPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-venuemap',
  templateUrl: 'venuemap.html',
})
export class VenuemapPage {
public url:any;
public myPhotosRef: any;
  public myPhoto: any;
  public myPhotoURL: any;
  public fbdata:any;
  public number:any;
  public latt:any;
  public longg:any;
   constructor(public navCtrl: NavController, public navParams: NavParams, public zone: NgZone,private toastCtrl: ToastController) {
   this.number=1;
   this.fbdata=firebase.database();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad VenuemapPage');
  }
  //adding links to the firebase database and displaying the image
  addphoto(){
  if (this.number==1){
  this.fbdata.ref('venuemap/').remove();
  }
  this.fbdata.ref('venuemap/image'+this.number).set(
  {link:this.url.trim()}
  );
  //alert("Image "+this.number+" link added:"+this.url.trim());
  let toast = this.toastCtrl.create({
    message: 'Image '+this.number+' link added:'+this.url.trim(),
    duration: 3000,
    position: 'bottom'

  });
  toast.present();
  this.number++;
  }
  //setting location of the venue
  addlocation(){
  this.fbdata.ref('venuemaplocation/coordinates/').set(
  {latt:this.latt.trim(),long:this.longg.trim()}
  );
  let toast = this.toastCtrl.create({
    message: 'Location of the venue updated with lattitude: ' +this.latt.trim()+' and longitude: '+this.longg.trim(),
    duration: 3000,
    position: 'bottom'
  });
  toast.present();

  }


}
