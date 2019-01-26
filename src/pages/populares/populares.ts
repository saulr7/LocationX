import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { FirebaseServiceProvider } from "../../providers/firebase-service/firebase-service";
import { LoadingController } from "ionic-angular";
import { NegocioDescripcionPage  } from "../negocio-descripcion/negocio-descripcion";

@IonicPage()
@Component({
  selector: 'page-populares',
  templateUrl: 'populares.html',
})
export class PopularesPage {

  negocios:any;
  negocioDescripcionPage= NegocioDescripcionPage;


  constructor
  (
      public navCtrl: NavController
    , public navParams: NavParams
    , public loadingCtrl :LoadingController
    , public fireBaseService: FirebaseServiceProvider
    )
   { 
     this.MostrarPopulares();
    }


  ionViewDidLoad() {
    
  }

  MostrarPopulares()
  {
    let loading = this.loadingCtrl.create({
      content: 'Por favor espere...'
    });
    loading.present();

    var listaEntidades = [];

    this.fireBaseService.EntidadesMasVisitadas().then((entidades)=>
    {

      var i = 0;
      entidades.forEach(element => {
        var entidad = {
          nombre : "",
          valor : 0
        }
        
        entidad.nombre = element.key
        entidad.valor = element.val();
        listaEntidades[i] = entidad
        i++;

      });
      loading.dismiss();
      this.negocios = listaEntidades
      this.negocios = this.negocios.reverse();
    } )
    

  }


  public ver_negocio(negocio)
  {
    this.navCtrl.push(this.negocioDescripcionPage,{negocio:negocio});
  }




}
