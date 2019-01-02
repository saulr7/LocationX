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
  homePage = HomePage;
  dataInfo = {registrarUsuario: false , descripcion: ""};

  registrarUsuario:boolean = false;

  constructor
    (
        public navCtrl: NavController
      ,public navParams: NavParams
      ,private authService : AuthServiceProvider
      , private toastCtrl : ToastController
    )
    {   
      this.dataInfo = this.navParams.get("dataInfo")
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

    if (this.dataInfo.registrarUsuario)
       {
         this.authService.signUpWithEmail(this.txtEmail, this.txtPassword , true).then((user) =>
         {
           console.log(user)
          this.navCtrl.setRoot(this.homePage)
          }).catch((error) =>
          {
            console.log("Here the error:" + error.message)
            this.showMessage("Algo ha salido mal: " +error.message)
          })
        }
    else
      {
        this.authService.loginWithEmail(this.txtEmail, this.txtPassword).then((user)=>{
          this.navCtrl.setRoot(this.homePage)

        }).catch((error) =>
      {
        this.showMessage("Algo ha salido mal: " +error.message)
      })
      }

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
