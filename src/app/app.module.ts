import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';

import { LoginPage } from '../pages/login/login';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { VenuemapPage } from '../pages/venuemap/venuemap';
import { SchedulePage } from '../pages/schedule/schedule';
import { DelegatekitPage } from '../pages/delegatekit/delegatekit';
import { TeamdetailsPage } from '../pages/teamdetails/teamdetails';
import { PersonalinfoPage } from '../pages/personalinfo/personalinfo';
import  { MentorsPage } from '../pages/mentors/mentors';
import  { OpportunitiesPage } from '../pages/opportunities/opportunities';
import  { TermsandconditionsPage } from '../pages/termsandconditions/termsandconditions';
import  { PrivacyPolicyPage } from '../pages/privacy-policy/privacy-policy';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    HomePage,
    ListPage,
    SchedulePage,
    DelegatekitPage,
    VenuemapPage,
    TeamdetailsPage,
    PersonalinfoPage,
    MentorsPage,
    OpportunitiesPage,
    TermsandconditionsPage,
    PrivacyPolicyPage

  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    HomePage,
    ListPage,
    SchedulePage,
    DelegatekitPage,
    VenuemapPage,
    TeamdetailsPage,
    PersonalinfoPage,
    MentorsPage,
    OpportunitiesPage,
    TermsandconditionsPage,
    PrivacyPolicyPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
