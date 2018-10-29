import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { NegociosPage } from "../negocios/negocios";

import { LoadingController  } from "ionic-angular";
import { FirebaseServiceProvider } from "../../providers/firebase-service/firebase-service";


@IonicPage()
@Component({
  selector: 'page-sub-categorias',
  templateUrl: 'sub-categorias.html',
})
export class SubCategoriasPage {

  negociosPage = NegociosPage
  subRubroNombre:string;
  subRubros:any;
  negocios:any;
  selectedRubro:string;

  constructor(public navCtrl: NavController
    ,public navParams: NavParams
    ,public firebaseService:FirebaseServiceProvider
    ,public loadingCtrl:LoadingController
  ) {
    
      this.subRubroNombre = navParams.get('Nombre');


      this.MostrarSubRubros();

        //this.getBussiness();
   
  }

  ver_negocio(subRubro)
  {
    this.navCtrl.push(this.negociosPage, {subRubro:subRubro.Nombre});
  }

  getItems(ev: any) 
  {
    console.log("Hizo click")
  }

  getBussiness() 
  {
    if (this.selectedRubro == "") {
      this.selectedRubro = this.subRubros[0].Nombre;
      console.log("Rubro")
      console.log(this.subRubros[0].Nombre)
    }

    this.firebaseService.ObtenerNegocios(this.selectedRubro).valueChanges().subscribe(negocios =>
      {    
        this.negocios = negocios
        console.log(this.negocios)
      })
    }


    MostrarSubRubros()
     {
        let loading = this.loadingCtrl.create({
          content: 'Por favor espere...'
        });
        loading.present();
      
        this.firebaseService.ObtenerSubRubros(this.subRubroNombre).valueChanges().subscribe(subRubros =>
          {
            this.subRubros = subRubros;
            loading.dismiss();
          });
      }


}
