import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { FirebaseServiceProvider } from "../../providers/firebase-service/firebase-service";
import { SubCategoriasPage } from "../sub-categorias/sub-categorias";

import { LoadingController } from "ionic-angular";
// import { AngularFireDatabase } from 'angularfire2/database';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  rubros:any; 
  subCategoriasPage = SubCategoriasPage;
  

  constructor(public navCtrl: NavController
    ,public fireBaseService: FirebaseServiceProvider
    ,public loadingCtrl :LoadingController
  )
    {
      this.MostrarRubros();
      this.fireBaseService.EntidadesMasVisitadas();
    }

  ver_rubro(rubro)
  {
     this.navCtrl.push(SubCategoriasPage,{Nombre: rubro.Nombre});
  }


  getIcon()
  {
    return "https://firebasestorage.googleapis.com/v0/b/locationx-72d68.appspot.com/o/Img%2FRubros%2FFinanzas.jpg?alt=media&token=f6fb26d6-1fa6-40b1-881f-6a5ab96b29dc";
  }

  MostrarRubros() {
    let loading = this.loadingCtrl.create({
      content: 'Por favor espere...'
    });
    loading.present();
  
    this.fireBaseService.ObtenerRubros().valueChanges().subscribe(rubro =>
      {
        this.rubros = rubro;
        loading.dismiss();
      });
  }
  

}
