import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { FavoritosPage } from "../pages/favoritos/favoritos";
import { ListPage } from '../pages/list/list';
import { PopularesPage  } from "../pages/populares/populares";
import { WelcomePage } from "../pages/welcome/welcome";
import { AlmacenamientoServiceProvider } from "../providers/almacenamiento-service/almacenamiento-service";
import { AuthServiceProvider } from "../providers/auth-service/auth-service";


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  //rootPage: any = HomePage;

  rootPage: any;
  emailAccount:string = "";

  pages: Array<{title: string, avatar:string, component: any}>;

  constructor(public platform: Platform
    , public statusBar: StatusBar
    , public splashScreen: SplashScreen
    , public almacenamientoService: AlmacenamientoServiceProvider
    , public authService : AuthServiceProvider
      )
   {
    this.initializeApp();

    this.almacenamientoService.IsLogIn().then((logueado) =>
    {
      if(logueado) 
        this.rootPage = HomePage
      else
      this.rootPage = WelcomePage
    })
    .catch((error) =>
    {
      this.rootPage = WelcomePage
    })

    this.almacenamientoService.getEmailAccount().then((email) =>
  {
    this.emailAccount = email
  })

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Inicio' , avatar: 'home', component: HomePage },
      {title: 'Favoritos', avatar: 'star', component:FavoritosPage},
      {title: 'Populares', avatar: 'globe', component:PopularesPage},
      // { title: 'List', avatar: 'home', component: ListPage }
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

  logOut()
  {
    this.authService.signOut();
    //this.almacenamientoService.LogOut();
    
    this.nav.setRoot(WelcomePage)
    this.rootPage = WelcomePage
  }


}
