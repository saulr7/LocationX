import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FirebaseServiceProvider } from "../../providers/firebase-service/firebase-service";
import { LoadingController } from "ionic-angular";

import { NegocioDescripcionPage } from "../negocio-descripcion/negocio-descripcion";

@IonicPage()
@Component({
  selector: 'page-favoritos',
  templateUrl: 'favoritos.html',
})
export class FavoritosPage {

  negocios:any;
  negocioDescripcionPage= NegocioDescripcionPage;
  constructor(public navCtrl: NavController
    , public navParams: NavParams
    , public loadingCtrl :LoadingController
    , public fireBaseService: FirebaseServiceProvider)
  {
    this.MostrarFavoritos();
  }

  MostrarFavoritos()
  {
    let loading = this.loadingCtrl.create({
      content: 'Por favor espere...'
    });
    loading.present();
    this.fireBaseService.ObtenerFavoritos("usuario2").valueChanges().subscribe(favoritos =>
    {
      this.negocios = favoritos;
      loading.dismiss();
    });
  }


  public ver_negocio(negocio)
  {
    this.navCtrl.push(this.negocioDescripcionPage,{negocio:negocio});
  }



}
