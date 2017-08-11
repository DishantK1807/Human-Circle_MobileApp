import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {FileChooser} from '@ionic-native/file-chooser';
//import {FilePath} from '@ionic-native/file-path';
//declare var cordova: any;

/**
 * Generated class for the SchedulePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-schedule',
  templateUrl: 'schedule.html',
})
export class SchedulePage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  //public FilePath:FilePath;
  //public FileChooser:FileChooser;
  //public eventsdata: EventData
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SchedulePage');
  }
//choosefile(){
//alert('files'); }

}
