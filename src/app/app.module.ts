import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

//Paginas
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { NegociosPage  } from "../pages/negocios/negocios";
import { SubCategoriasPage } from "../pages/sub-categorias/sub-categorias";
import { NegocioDescripcionPage  } from "../pages/negocio-descripcion/negocio-descripcion";
import { FavoritosPage } from "../pages/favoritos/favoritos";
import { WelcomePage } from "../pages/welcome/welcome";
import { IniciarSesionPage  } from "../pages/iniciar-sesion/iniciar-sesion";
import { RegistrarsePage } from "../pages/registrarse/registrarse";
import { PopularesPage  } from "../pages/populares/populares";

//
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { FirebaseServiceProvider } from '../providers/firebase-service/firebase-service';


//Firebase
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule, AngularFireDatabase } from '@angular/fire/database';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireStorageModule } from "@angular/fire/storage";

import { AlmacenamientoServiceProvider } from '../providers/almacenamiento-service/almacenamiento-service';
import { IonicStorageModule } from "@ionic/storage";
import { AuthServiceProvider } from '../providers/auth-service/auth-service';

const firebaseConfig = {
  apiKey: "AIzaSyAX78S4dACcaRm3Jzsdq--kB9WeDVLITPE",
  authDomain: "locationx-72d68.firebaseapp.com",
  databaseURL: "https://locationx-72d68.firebaseio.com",
  projectId: "locationx-72d68",
  storageBucket: "locationx-72d68.appspot.com",
  messagingSenderId: "758432149096"
  
};


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    NegociosPage,
    SubCategoriasPage,
    NegocioDescripcionPage,
    FavoritosPage,
    WelcomePage,
    IniciarSesionPage,
    RegistrarsePage,
    PopularesPage,

  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireStorageModule,
    AngularFireAuthModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    NegociosPage,
    SubCategoriasPage,
    NegocioDescripcionPage,
    FavoritosPage,
    WelcomePage,
    IniciarSesionPage,
    RegistrarsePage,
    PopularesPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AngularFireDatabase,
    AngularFireStorageModule,
    FirebaseServiceProvider,
    AlmacenamientoServiceProvider,
    AuthServiceProvider
  ]
})
export class AppModule {}
