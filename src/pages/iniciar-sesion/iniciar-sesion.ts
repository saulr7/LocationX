import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { AuthServiceProvider } from "../../providers/auth-service/auth-service";
import { ToastController } from "ionic-angular"
import { HomePage  } from "../home/home";


@IonicPage()
@Component({
  selector: 'page-iniciar-sesion',
  templateUrl: 'iniciar-sesion.html',
})
export class IniciarSesionPage {


  txtEmail:string = "";
  txtPassword:string = "";
  homePage = HomePage

  constructor
    (
        public navCtrl: NavController
      ,public navParams: NavParams
      ,private authService : AuthServiceProvider
      , private toastCtrl : ToastController
    )
    {    }

  ionViewDidLoad() {
    console.log('ionViewDidLoad IniciarSesionPage');
  }


  hacer_login()
  {
    if(!this.txtEmail )
    {
      this.showMessage("Es necesario una dirección de correo");
      return;
    }

    if(!this.txtPassword )
    {
      this.showMessage("Es necesaria la contraseña")
      return;
    }

    this.authService.signUpWithEmail(this.txtEmail, this.txtPassword , true)
    // this.authService.loginWithEmail(this.txtEmail, this.txtPassword)

    if (this.authService.currentUserName() != "" )
     {
        this.navCtrl.setRoot(this.homePage)
     }

     //this.authService.signOut();

  }


 
  showMessage(mensaje)
  {
    const toast = this.toastCtrl.create({
      message: mensaje,
      duration:1500
    });
    toast.present();
  }

}
