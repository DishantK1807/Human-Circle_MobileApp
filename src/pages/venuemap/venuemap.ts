import { Component,NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FileChooser } from '@ionic-native/file-chooser';
import { FilePath } from '@ionic-native/file-path';
import { File } from '@ionic-native/file';
import { Camera, CameraOptions } from '@ionic-native/camera';
import * as firebase from 'firebase';
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
   constructor(public navCtrl: NavController, public navParams: NavParams, public zone: NgZone, public camera:Camera) {
   this.number=1;
   this.fbdata=firebase.database();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad VenuemapPage');
  }
  addphoto(){
  //alert(this.number);
  if (this.number==1){
  this.fbdata.ref('venuemap/').remove();
  }
  this.fbdata.ref('venuemap/image'+this.number).set(
  {link:this.url.trim()}
  );
  alert("Image "+this.number+" link added:"+this.url.trim());
  this.number++;
  }
  addlocation(){
  this.fbdata.ref('venuemaplocation/coordinates/').set(
  {latt:this.latt.trim(),long:this.longg.trim()}
  );
  alert("Location of the venue updated with lattitude: " +this.latt.trim()+" and longitude: "+this.longg.trim());
  }
}
