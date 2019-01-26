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
  favoritos:any;
  EntidadesGuardadas:any;

  Sucursales:any;
  Favorito:string;
  Guardar:string;
  hayError:boolean =false;


  entidad = {
      Nombre: "Titulo"
    , Descripcion: "Descripcion"
    , Correo: ""
    , PaginaWeb:""
    , Telefono : null
    , UrlImagen: ""}


  constructor(public navCtrl: NavController
      , public navParams: NavParams
      , public fireBaseService: FirebaseServiceProvider
      ,public almacenamientoService: AlmacenamientoServiceProvider
      , public loadingCtrl :LoadingController
      , public toastCtrl: ToastController
    ) 
    {
      this.negocio = this.navParams.get("negocio");  
      
      if (!this.negocio)
      {
        this.hayError = true;
        return;
      }

      this.MostrarEntidad();
      this.MostrarSucursales();
      this.EsFavorito()
      this.EstaGuardado()
      //this.ObtenerVisitas();
      this.UnaVisitaMas();
    }

    MostrarEntidad()
    {
    
      let loading = this.loadingCtrl.create({
        content: 'Por favor espere...'
      });
      loading.present();

      if (!this.negocio) 
      {
        this.hayError = true
        loading.dismiss();
        return;
      }

      this.fireBaseService.ObtenerEntidad(this.negocio).on("value", entidades =>
      {
      
        try
        {
          this.entidad = entidades.val();
          loading.dismiss();
          
        }
         catch (error)
         {
            loading.dismiss();
            this.hayError = true;
            console.log(error) 
        }

    })
      
    }

    MostrarSucursales()
    {
      this.fireBaseService.ObteneSucursales(this.negocio).valueChanges().subscribe(entidad =>
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
        this.fireBaseService.RegistrarOtroFavorito(this.negocio, false)
        this.showMessage("Removido de favoritos");
       }
       else
       {
        this.fireBaseService.AgregarFavorito(this.negocio);
        this.Favorito = "EsFavorito"
        this.fireBaseService.RegistrarOtroFavorito(this.negocio)
        this.showMessage("Agregado a favoritos");
       }

    }

    EsFavorito()
    {
      this.almacenamientoService.getUserId().then((userId) =>{
        this.fireBaseService.ObtenerFavoritos(userId).valueChanges().subscribe(favoritos =>
        {
          this.favoritos = favoritos;
          this.Favorito = "NoEsFavorito";
          this.favoritos.forEach(favorito => {
            if (favorito == this.negocio)
              {
                this.Favorito = "EsFavorito";
              }
          });
        });
      })

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

    UnaVisitaMas()
    {
      this.fireBaseService.RegistrarOtraVisita(this.negocio)
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
