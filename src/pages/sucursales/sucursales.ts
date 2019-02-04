import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { FirebaseServiceProvider  } from "../../providers/firebase-service/firebase-service";
import { ISucursal } from '../../models/ISucursal';


@IonicPage()
@Component({
  selector: 'page-sucursales',
  templateUrl: 'sucursales.html',
})
export class SucursalesPage {

  entidadId: string = "";
  sucursales: ISucursal[]= [];

  constructor(
       public navCtrl: NavController
     , public navParams: NavParams
     , private firebaseServiceProvider : FirebaseServiceProvider)
   {
      this.entidadId = this.navParams.get("negocioId")
      this.cargar_sucursales();
   }

  ionViewDidLoad() {
  }


  cargar_sucursales()
  {
    if (!this.entidadId)
        return;

    this.firebaseServiceProvider.obtener_sucursales("Siman").once("value").then((sucursales)=>
    {
        sucursales.forEach(sucursal => {
          this.sucursales.push(sucursal.val())
        });
    })
  }

}
