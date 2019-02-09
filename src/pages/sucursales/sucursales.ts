import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ActionSheetController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation/ngx';

import { FirebaseServiceProvider  } from "../../providers/firebase-service/firebase-service";
import { ISucursal } from '../../models/ISucursal';
import {GoogleMapsPage} from '../google-maps/google-maps';


@IonicPage()
@Component({
  selector: 'page-sucursales',
  templateUrl: 'sucursales.html',
})
export class SucursalesPage {

  googleMapsPage = GoogleMapsPage
  entidadId: string = "";
  sucursales: ISucursal[]= [];
  geolocation:Geolocation;

  sucursalesList:Array<any>;
  loadedSucursales :Array<any>;

  lat: number;
  longt: number;
  position:any;

  constructor(
       public navCtrl: NavController
     , public navParams: NavParams
     , private firebaseServiceProvider : FirebaseServiceProvider
     , public actionSheetCtrl: ActionSheetController
    )
   {
      this.entidadId = this.navParams.get("negocioId")
      this.cargar_sucursales();
      this.get_position();
   }


  get_position()

  {
    // this.geolocation.getCurrentPosition( ) .then((resp) => {
    //   console.log(resp.coords.latitude);
    //   console.log(resp.coords.longitude);
      
    //  }).catch((error) => {
    //    console.log('Error getting location', error);
    //  });
     
  }


  cargar_sucursales()
  {
    if (!this.entidadId)
        return;

    this.firebaseServiceProvider.obtener_sucursales("UTH").once("value").then((sucursales)=>
    {
        sucursales.forEach(sucursal => {
          this.sucursales.push(sucursal.val())
        });
        this.sucursalesList = this.sucursales;
        this.loadedSucursales = this.sucursales;
    })
  }

    presentActionSheet() {
    const actionSheet = this.actionSheetCtrl.create({
      title: 'Opciones',
      buttons: [
        {
          text: 'Mas cercanas',
          handler: () => {
            console.log('Mas cercanas');
          }
        },{
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }

  buscar(ev: any) 
  {
    this.initializeItems();

    var terminoBusqueda = ev.srcElement.value ;

      if (!terminoBusqueda)
          return;
      
      this.sucursalesList = this.sucursalesList.filter((v) => {
        

        if(v.Nombre && terminoBusqueda) 
        {
          if ((v.Nombre.toLowerCase().indexOf(terminoBusqueda.toLowerCase()) > -1
           || v.Direccion.toLowerCase().indexOf(terminoBusqueda.toLowerCase()) > -1)    ) 
          {
            return true;
          }
          else{
            return false;
          }
        }
        
      });

  }


  initializeItems(): void 
  {
    this.sucursalesList = this.loadedSucursales;
  }

  ver_mapa(sucursal)
  {
    console.log(sucursal);
    
    if(!sucursal.Cordenadas)
      return false

    if(!sucursal.Cordenadas.Latitud || !sucursal.Cordenadas.Longitud)
      return false
    var params =
    {
      Nombre   : sucursal.Nombre,
      Latitud  : sucursal.Cordenadas.Latitud,
      Longitud : sucursal.Cordenadas.Longitud
    }
    this.navCtrl.push(this.googleMapsPage,{params})
  }

}
