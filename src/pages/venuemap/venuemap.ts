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
   constructor(public navCtrl: NavController, public navParams: NavParams, public zone: NgZone, public camera:Camera) {
   this.number=1;
   this.fbdata=firebase.database();
   //this.myPhotosRef = firebase.storage().ref('/Photos/');
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


  takePhoto() {
  alert('weeaw');

   this.camera.getPicture({
     quality: 100,
     destinationType: this.camera.DestinationType.DATA_URL,
     sourceType: this.camera.PictureSourceType.CAMERA,
     encodingType: this.camera.EncodingType.PNG,
     saveToPhotoAlbum: true
   }).then(imageData => {
     this.myPhoto = imageData;
     this.uploadPhoto();
   }, error => {
     console.log("ERROR -> " + JSON.stringify(error));
   });
 }
 selectPhoto(): void {
   this.camera.getPicture({
     sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
     destinationType: this.camera.DestinationType.DATA_URL,
     quality: 100,
     encodingType: this.camera.EncodingType.PNG,
   }).then(imageData => {
     this.myPhoto = imageData;
     this.uploadPhoto();
   }, error => {
     console.log("ERROR -> " + JSON.stringify(error));
   });
 }

 private uploadPhoto(): void {
   this.myPhotosRef.child(this.generateUUID()).child('myPhoto.png')
     .putString(this.myPhoto, 'base64', { contentType: 'image/png' })
     .then((savedPicture) => {
       this.myPhotoURL = savedPicture.downloadURL;
     });
 }

 private generateUUID(): any {
   var d = new Date().getTime();
   var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx'.replace(/[xy]/g, function (c) {
     var r = (d + Math.random() * 16) % 16 | 0;
     d = Math.floor(d / 16);
     return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
   });
   return uuid;
 }


/*  display() {
    this.firestore.ref().child('image').getDownloadURL().then((url) => {
      this.zone.run(() => {
        this.imgsource = url;
       })
    })
  }*/


}
