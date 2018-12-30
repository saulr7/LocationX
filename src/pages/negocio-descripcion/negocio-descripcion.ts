import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

//Services
import { FirebaseServiceProvider } from "../../providers/firebase-service/firebase-service";
import { AlmacenamientoServiceProvider } from "../../providers/almacenamiento-service/almacenamiento-service";

import { LoadingController } from "ionic-angular";
import { ToastController  } from "ionic-angular";


@IonicPage()
@Component({
  selector: 'page-negocio-descripcion',
  templateUrl: 'negocio-descripcion.html',
})
export class NegocioDescripcionPage {

  negocio:any;
  entidad:any;
  favoritos:any;
  EntidadesGuardadas:any;

  Nombre:string;
  Descripcion:string;
  Correo:string;
  PaginaWeb:string;
  Telefono:string;
  UrlImagen:string;
  Sucursales:any;
  Favorito:string;
  Guardar:string;


  constructor(public navCtrl: NavController
      , public navParams: NavParams
      , public fireBaseService: FirebaseServiceProvider
      ,public almacenamientoService: AlmacenamientoServiceProvider
      , public loadingCtrl :LoadingController
      , public toastCtrl: ToastController
    ) 
    {
      this.negocio = this.navParams.get("negocio");  
      this.MostrarEntidad();
      this.MostrarSucursales();
      this.EsFavorito()
      this.EstaGuardado()
    }

    MostrarEntidad()
    {
    
      let loading = this.loadingCtrl.create({
        content: 'Por favor espere...'
      });
      loading.present();
    
      this.fireBaseService.ObtenerEntidad(this.negocio.Entidad).valueChanges().subscribe(entidad =>
      {
        this.entidad = entidad[0];
        this.Nombre = this.entidad.Nombre;
        this.Descripcion  = this.entidad.Descripcion;
        this.Correo  = this.entidad.Correo;
        this.PaginaWeb  = this.entidad.PaginaWeb;
        this.Telefono  = this.entidad.Telefono;
        this.UrlImagen  = this.entidad.UrlImagen;
        loading.dismiss();
      });
    }

    MostrarSucursales()
    {
      this.fireBaseService.ObteneSucursales(this.negocio.Entidad).valueChanges().subscribe(entidad =>
      {
        this.Sucursales = entidad;
      })
    }

    AgregarQuitarFavorito()
    {
      
      if(this.Favorito == "EsFavorito")
       {
        this.fireBaseService.QuitarFavorito(this.negocio);
        this.Favorito = "NoEsFavorito";
        this.showMessage("Removido de favoritos");
       }
       else
       {
        this.fireBaseService.AgregarFavorito(this.negocio);
        this.Favorito = "EsFavorito"
        this.showMessage("Agregado a favoritos");
       }

    }

    EsFavorito()
    {
      this.fireBaseService.ObtenerFavoritos("usuario2").valueChanges().subscribe(favoritos =>
      {
        this.favoritos = favoritos;
        this.Favorito = "NoEsFavorito";
        this.favoritos.forEach(favorito => {
          if (favorito.Entidad == this.negocio.Entidad)
            {
              this.Favorito = "EsFavorito";
            }
        });
      });
    }

    GuardarLocal()
    {

      if(this.Guardar == "NoGuardado")
      {
        this.Guardar = "Guardado";
        this.almacenamientoService.GuardarEntidadLocal(this.negocio);
        this.showMessage("Se ha removido");
      }
      else
      {
        this.Guardar = "NoGuardado";
        this.almacenamientoService.RemoverEntidadLocal(this.negocio);
        this.almacenamientoService.ObternerEntidades();
        this.showMessage("Se ha guardado localmente");
      }  
    }

    EstaGuardado()
    {

      this.almacenamientoService.ObternerEntidades().then((entidades)=>
      {
        this.EntidadesGuardadas = JSON.parse("["+ entidades +"]") 
        console.log(this.EntidadesGuardadas)
        this.Guardar = "NoGuardado"
        this.EntidadesGuardadas.forEach(entidad => {
          if (entidad.Entidad == this.negocio.Entidad)
              this.Guardar = "Guardado"
        });
      }).catch((error)=>
      {
       console.error("Error->:", error) 
      })
    }

    showMessage(mensaje)
    {
      const toast = this.toastCtrl.create({
        message: mensaje,
        duration:1000
      });
      toast.present();
    }


}
