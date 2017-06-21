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

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = LoginPage;

  pages: Array<{title: string, component: any, icons: string}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: HomePage ,icons :'home'},
      { title: 'Schedule', component: SchedulePage ,icons :'calendar'},
      { title: 'Team Details', component: TeamdetailsPage ,icons :'contacts'},
      { title: 'Delegate Kit', component: DelegatekitPage ,icons :'briefcase'},
      { title: 'Venue Map', component: VenuemapPage ,icons :'map'},
      { title: 'Personal Info', component: PersonalinfoPage ,icons :'person'}
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
