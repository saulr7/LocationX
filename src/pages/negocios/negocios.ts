import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FirebaseServiceProvider } from "../../providers/firebase-service/firebase-service";
import { LoadingController } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-negocios',
  templateUrl: 'negocios.html',
})
export class NegociosPage {

  negocios:any;

  subRubroNombre:string;

  constructor(public navCtrl: NavController, public navParams: NavParams
    ,public firebaseService:FirebaseServiceProvider
    ,public loadingCtr: LoadingController
  ) {

      this.subRubroNombre = navParams.get('subRubro')
      this.MostrarNegocios();
  }

  ionViewDidLoad() {
    
  }

  ver_negoio()
  {
    var valores = this.firebaseService.ObtenerNegocios("Salud");
    console.log(valores)
  }

  getItems(ev: any) 
  {
    console.log("Hizo click")
  }

  add_Favorite(negocio)
  {
    console.log(negocio.Nombre);
  }

  MostrarNegocios() {
    let loading = this.loadingCtr.create({
      content: 'Por favor espere...'
    });
    loading.present();
  
    this.firebaseService.ObtenerNegocios(this.subRubroNombre).valueChanges().subscribe(negocios =>
      {
        this.negocios = negocios;
        loading.dismiss();
      });
  }
  


}
