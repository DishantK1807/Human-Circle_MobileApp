import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LoginPage } from '../pages/login/login';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { VenuemapPage } from '../pages/venuemap/venuemap';
import { SchedulePage } from '../pages/schedule/schedule';
import { DelegatekitPage } from '../pages/delegatekit/delegatekit';
import { TeamdetailsPage } from '../pages/teamdetails/teamdetails';
import { PersonalinfoPage } from '../pages/personalinfo/personalinfo';
import { MentorsPage } from '../pages/mentors/mentors';
import { OpportunitiesPage } from '../pages/opportunities/opportunities';

import { PrivacypolicyPage } from '../pages/privacypolicy/privacypolicy';

import { TermsandconditionsPage } from '../pages/termsandconditions/termsandconditions';
import * as firebase from 'firebase';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  public rootPage: any;
  pages: Array<{title: string, component: any, icons: string}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen) {
  //this.rootPage = LoginPage;
  // Initialize Firebase
    var config = {
      apiKey: "AIzaSyBjnqMDq7uz5ETdSKHcGDKrj2tlTGsnL54",
      authDomain: "human-circle.firebaseapp.com",
      databaseURL: "https://human-circle.firebaseio.com",
      projectId: "human-circle",
      storageBucket: "human-circle.appspot.com",
      messagingSenderId: "418555457379"
    };
    firebase.initializeApp(config);
    firebase.auth().onAuthStateChanged((user)=>{
    if (user){
    this.rootPage=HomePage;
    }
    else {
    this.rootPage=LoginPage;
    }
    });


    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: HomePage ,icons :'home'},
      { title: 'Schedule', component: SchedulePage ,icons :'calendar'},
      { title: 'Team Details', component: TeamdetailsPage ,icons :'contacts'},
      { title: 'Delegate Kit', component: DelegatekitPage ,icons :'briefcase'},
      { title: 'Venue Map', component: VenuemapPage ,icons :'map'},
      { title: 'Personal Info', component: PersonalinfoPage ,icons :'person'},

      { title: 'Mentors', component: MentorsPage ,icons :'person'},
      { title: 'Opportunities', component: OpportunitiesPage ,icons :'person'},
      { title: 'Privacy Policy', component: PrivacypolicyPage ,icons :'person'},

      { title: 'Terms and Conditions', component: TermsandconditionsPage ,icons :'person'}
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
