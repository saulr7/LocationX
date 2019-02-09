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

  entidadesList:Array<any>;
  loadedEntidadesList:Array<any>;
  ciudades:any;
  ciudadSelected:any
  public entidadesRef:firebase.database.Reference;

  negocioDescripcionPage= NegocioDescripcionPage;

  constructor(public navCtrl: NavController, public navParams: NavParams
    ,public firebaseService:FirebaseServiceProvider
    ,public loadingCtr: LoadingController
  ) 
  {
      this.subRubroNombre = navParams.get('subRubro')
      this.MostrarNegocios();
      this.Ciudades()
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

    var terminoBusqueda = "";
    try {
        terminoBusqueda =  ev.srcElement.value;
      
    } catch (error) {
      terminoBusqueda = ""
    }

    

      if (!terminoBusqueda && !this.ciudadSelected)
          return;
      
      this.entidadesList = this.entidadesList.filter((v) => {
        

        if(v.Nombre && terminoBusqueda) 
        {
          if ((v.Nombre.toLowerCase().indexOf(terminoBusqueda.toLowerCase()) > -1
           || v.Descripcion.toLowerCase().indexOf(terminoBusqueda.toLowerCase()) > -1)
           && this.filtrarCiudad(v.Ciudades)     ) 
          {
            return true;
          }
          else{
            return false;
          }
        }
        if(this.ciudadSelected)
        {
          if (this.filtrarCiudad(v.Ciudades)   ) 
            return true;
          else
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
      
      this.firebaseService.ObtenerNegocios(this.subRubroNombre).on('value', entidadesList => 
      {
        if (!entidadesList.val() )
        {
          this.hayRegistrosParaMostrar = false;
          loading.dismiss();
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
  }
  

  initializeItems(): void {
    this.entidadesList = this.loadedEntidadesList;
  }

  Ciudades()
  {
    this.firebaseService.ObtenerCiudades().once("value").then((ciudades)=>
    {

      var i = 0;
      var listaCiudades = [];

      ciudades.forEach(element => {
        if (!element.val().Activo)
          return
        var ciudad = { Nombre: "", Id : ""}
        ciudad.Nombre = element.val().Nombre;
        ciudad.Id = element.key;
        listaCiudades[i] = ciudad
        i++;
      });
      this.ciudades = listaCiudades
    })
  }


  private filtrarCiudad(ciudades)
  {
    
    var seEncontro = false;
    Object.keys(ciudades).forEach(ciudad =>{
       if(!this.ciudadSelected)
          {
            seEncontro = true
            return
          }

       if(seEncontro)
        return

        if(!ciudad)
          return;

      if(ciudad.toLowerCase().trim() == this.ciudadSelected.toLowerCase().trim())
        seEncontro = true;
      else
        seEncontro = false;
    })
    return seEncontro;
  }


}
