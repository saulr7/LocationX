
import { Injectable } from '@angular/core';
import { AngularFireAuth  } from "angularfire2/auth";
import { HomePage  } from "../../pages/home/home";
import { AlmacenamientoServiceProvider } from "../../providers/almacenamiento-service/almacenamiento-service";

@Injectable()
export class AuthServiceProvider {

  authState: any = null;
  homePage = HomePage 

  constructor(
     private afAuth : AngularFireAuth  
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
        // throw error
      });
  }

  loginWithEmail(email: string, password: string) {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password)
      .then((response) => {
        this.authState = response
        this.almacenamientoService.Login(response.user);
        //this.almacenamientoService.saveEmailAccount(this.currentUserName())
      })
      .catch(error => {
        throw error
      });
  }

  signOut(): void {
    this.afAuth.auth.signOut();
    this.almacenamientoService.LogOut();
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
 

}
