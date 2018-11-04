import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { FirebaseServiceProvider } from "../../providers/firebase-service/firebase-service";


@IonicPage()
@Component({
  selector: 'page-negocio-descripcion',
  templateUrl: 'negocio-descripcion.html',
})
export class NegocioDescripcionPage {

  negocio:any;
  entidad:any;
  Nombre:string;
  Descripcion:string;
  Correo:string;
  PaginaWeb:string;
  Telefono:string;
  UrlImagen:string;
  Sucursales:any;
  Favorito:string;

  constructor(public navCtrl: NavController
      , public navParams: NavParams
      , public fireBaseService: FirebaseServiceProvider
    ) 
    {
      this.negocio = this.navParams.get("negocio");  
      this.MostrarEntidad();
      this.MostrarSucursales();
      this.Favorito = "EsFavorito"

    }

    MostrarEntidad()
    {
      this.fireBaseService.ObtenerEntidad(this.negocio.Entidad).valueChanges().subscribe(entidad =>
      {
        this.entidad = entidad[0];
        
        this.Nombre = this.entidad.Nombre;
        this.Descripcion  = this.entidad.Descripcion;
        this.Correo  = this.entidad.Correo;
        this.PaginaWeb  = this.entidad.PaginaWeb;
        this.Telefono  = this.entidad.Telefono;
        this.UrlImagen  = this.entidad.UrlImagen;
      
      })
    }

    MostrarSucursales()
    {
      this.fireBaseService.ObteneSucursales(this.negocio.Entidad).valueChanges().subscribe(entidad =>
      {
        console.log(entidad)
        this.Sucursales = entidad;
      })
    }


}
