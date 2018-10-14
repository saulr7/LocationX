import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
//import { NegociosPage } from "../negocios/negocios";
import { SubCategoriasPage } from "../sub-categorias/sub-categorias";

import { Firebase } from '@ionic-native/firebase';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  //negociosPage = NegociosPage;
  subCategoriasPage = SubCategoriasPage;

  firebase: Firebase;

  constructor(public navCtrl: NavController
    ) {

  }

  HizoClick()
  {
  //   this.firebase.getToken()
  // .then(token => console.log(`The token is ${token}`)) // save the token server-side and use it to push notifications to this device
  // .catch(error => console.error('Error getting token', error));
    //console.table(this.firebase.getToken());
    this.navCtrl.push(this.subCategoriasPage);
  }

}
