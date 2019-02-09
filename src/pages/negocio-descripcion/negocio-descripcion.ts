import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

//Services
import { FirebaseServiceProvider } from "../../providers/firebase-service/firebase-service";
import { AlmacenamientoServiceProvider } from "../../providers/almacenamiento-service/almacenamiento-service";

import { LoadingController } from "ionic-angular";
import { ToastController  } from "ionic-angular";

import {GoogleMapsPage} from '../google-maps/google-maps';
import {SucursalesPage} from '../sucursales/sucursales';
//Models
import {IEntidad} from '../../models/IEntidad';


@IonicPage()
@Component({
  selector: 'page-negocio-descripcion',
  templateUrl: 'negocio-descripcion.html',
})
export class NegocioDescripcionPage {

  negocio:any;
  favoritos:any;
  EntidadesGuardadas:any;

  totalFavoritos: number;
  totalVisitas: number;  
  
  Sucursales:any;
  Favorito:string;
  Guardar:string;
  hayError:boolean =false;
  mostrarMapa:boolean= false;
  tieneSucursales:boolean = false;

  googleMapsPage = GoogleMapsPage
  sucursalesPage = SucursalesPage

  entidad = new IEntidad()

  constructor(public navCtrl: NavController
      , public navParams: NavParams
      , public fireBaseService: FirebaseServiceProvider
      , public almacenamientoService: AlmacenamientoServiceProvider
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
      this.obtener_metricas();
      this.UnaVisitaMas();
      this.tiene_sucursales();

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
          this.mostrarMapa  = (this.entidad.Cordenadas.Latitud && this.entidad.Cordenadas.Latitud) ? true: false;
          loading.dismiss();
          
        }
         catch (error)
         {
            loading.dismiss();
            this.hayError = true;
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


    ver_mapa()
    {
      var params =
      {
        Nombre   : this.entidad.Nombre,
        Latitud  : this.entidad.Cordenadas.Latitud,
        Longitud : this.entidad.Cordenadas.Longitud
      }
      this.navCtrl.push(this.googleMapsPage,{params})
    }

    obtener_metricas()
    {
        this.fireBaseService.ObtenerConteoFavoritos(this.negocio)
        .once("value" , favoritos =>
        {
          var totalFavoritos =  (favoritos.val() ? favoritos.val() : 0 ) +1
          this.totalFavoritos = totalFavoritos;
        }) ;

        this.fireBaseService.ObtenerVisitas(this.negocio)
        .once("value" , visitas =>
        {
          var totalVisitas =  (visitas.val() ? visitas.val() : 0 ) +1
          this.totalVisitas = totalVisitas
        }) 
    }

    validar_mostrar_mapa()
    {
      if(!this.entidad.Cordenadas)
        return false

      if(!this.entidad.Cordenadas.Latitud || !this.entidad.Cordenadas.Longitud)
        return false

      else
        return true;
    }

    ver_sucursales()
    {
      this.navCtrl.push(this.sucursalesPage,{negocioId : this.negocio})
    }

    tiene_sucursales()
    {
      this.fireBaseService.tiene_sucursales(this.negocio).once("value", (tieneSucursal)=>
      {
        if(tieneSucursal.val())
          this.tieneSucursales = true;
      })
    }



}

