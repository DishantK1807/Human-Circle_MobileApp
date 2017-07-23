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
import { OpportunitiesPage } from '../pages/opportunities/opportunities';
import { MentorsPage } from '../pages/mentors/mentors';

import { PrivacypolicyPage } from '../pages/privacypolicy/privacypolicy';
import { TermsandconditionsPage } from '../pages/termsandconditions/termsandconditions';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { UsersServiceProvider } from '../providers/users-service/users-service';
import { HttpModule } from '@angular/http';


import { Camera } from '@ionic-native/camera';


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
    PrivacypolicyPage,
    TermsandconditionsPage,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule
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
    PrivacypolicyPage,
    TermsandconditionsPage
  ],
  providers: [
    StatusBar,
    Camera,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    UsersServiceProvider
  ]
})
export class AppModule {}
