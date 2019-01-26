import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FirebaseServiceProvider } from "../../providers/firebase-service/firebase-service";
import { LoadingController } from 'ionic-angular';
import { NegocioDescripcionPage } from "../../pages/negocio-descripcion/negocio-descripcion";

@IonicPage()
@Component({
  selector: 'page-negocios',
  templateUrl: 'negocios.html',
})
export class NegociosPage {

  negocios:any;

  subRubroNombre:string;
  hayRegistrosParaMostrar:boolean = true;

  public entidadesList:Array<any>;
  public loadedEntidadesList:Array<any>;
  public entidadesRef:firebase.database.Reference;

  negocioDescripcionPage= NegocioDescripcionPage;

  constructor(public navCtrl: NavController, public navParams: NavParams
    ,public firebaseService:FirebaseServiceProvider
    ,public loadingCtr: LoadingController
  ) 
  {
      this.subRubroNombre = navParams.get('subRubro')
      this.MostrarNegocios();
    }

  ionViewDidLoad() {
    
  }

  ver_negocio(negocio)
  {
    this.navCtrl.push(this.negocioDescripcionPage,{negocio:negocio.Entidad});
  }

  buscar(ev: any) 
  {
    this.initializeItems();

    var terminoBusqueda = ev.srcElement.value;

      if (!terminoBusqueda) {
        return;
      }
      this.entidadesList = this.entidadesList.filter((v) => {
        
        if(v.Nombre && terminoBusqueda) 
        {
          if (v.Nombre.toLowerCase().indexOf(terminoBusqueda.toLowerCase()) > -1
           || v.Descripcion.toLowerCase().indexOf(terminoBusqueda.toLowerCase()) > -1) 
          {
            return true;
          }
          return false;
        }
      });

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
  
    try {
      
      // this.entidadesRef = this.firebaseService.afDB.database.ref('/Negocios/'+this.subRubroNombre);
      // this.entidadesRef.on('value', entidadesList => {
      
      this.firebaseService.ObtenerNegocios(this.subRubroNombre).on('value', entidadesList => 
      {
        if (!entidadesList.val() )
        {
          this.hayRegistrosParaMostrar = false;
          return;
        }
        let Entidades = [];
        entidadesList.forEach( country => {
          Entidades.push(country.val());
          return false;
        });
        
        this.entidadesList = Entidades;
        this.loadedEntidadesList = Entidades;
        loading.dismiss();
      });
    } 
    catch (error) 
    {
      loading.dismiss();
    }


    // this.firebaseService.ObtenerNegocios(this.subRubroNombre).valueChanges().subscribe(negocios =>
    //   {
    //     this.negocios = negocios;
    //     if (!this.negocios[0] )
    //     {
    //       this.hayRegistrosParaMostrar = false;
    //     }
    //     loading.dismiss();
    //   });
  }
  

  initializeItems(): void {
    this.entidadesList = this.loadedEntidadesList;
  }


}
