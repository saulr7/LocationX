
import { Injectable } from '@angular/core';
import { AngularFireAuth  } from "angularfire2/auth";
import { ToastController } from "ionic-angular"
import { HomePage  } from "../../pages/home/home";
import { AlmacenamientoServiceProvider } from "../../providers/almacenamiento-service/almacenamiento-service";

@Injectable()
export class AuthServiceProvider {

  authState: any = null;
  homePage = HomePage 

  constructor(
     private afAuth : AngularFireAuth  
    ,private toastCtrl: ToastController
    ,public almacenamientoService: AlmacenamientoServiceProvider    
  ) 
  { 
    this.afAuth.authState.subscribe((auth) => {
      this.authState = auth
    });
  }


  public signUpWithEmail(email: string, password: string, loggin: boolean = false)
   {
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password)
      .then((user) => {
        this.authState = user
        if(loggin)
        this.loginWithEmail(email, password)
        console.log(this.authState)
      })
      .catch(error => {
        console.log(error)
        this.showMessage("Algo ha salido mal :" + error.message)
        // throw error
      });
  }

  loginWithEmail(email: string, password: string) {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password)
      .then((user) => {
        this.authState = user
        this.almacenamientoService.Login();
        console.log("Logueado")
        // this.navCtrl.setRoot(this.homePage)
      })
      .catch(error => {
        console.log(error)
        this.showMessage("Algo ha salido mal :" + error.message)
      });
  }

  signOut(): void {
    this.afAuth.auth.signOut();
    this.almacenamientoService.LogOut();
    console.log("Log out")
    // this.router.navigate(['/'])
  }


  isUserEmailLoggedIn(): boolean 
  {
    if ((this.authState !== null) && (!this.isUserAnonymousLoggedIn)) {
      return true
    } else {
      return false
    }
  }

  isUserAnonymousLoggedIn(): boolean 
  {
    return (this.authState !== null) ? this.authState.isAnonymous : false
  }

  currentUserName(): string
  {
    return (this.authState !== null) ? this.authState['email']   : ""
  }
 


  showMessage(mensaje)
  {
    const toast = this.toastCtrl.create({
      message: mensaje,
      duration:2000
    });
    toast.present();
  }

}
