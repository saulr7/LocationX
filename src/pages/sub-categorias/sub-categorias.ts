import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { NegociosPage } from "../negocios/negocios";

/**
 * Generated class for the SubCategoriasPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-sub-categorias',
  templateUrl: 'sub-categorias.html',
})
export class SubCategoriasPage {

  negociosPage = NegociosPage

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SubCategoriasPage');
  }

  ver_negocio()
  {
    this.navCtrl.push(this.negociosPage);
  }

}
