
import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

declare var google : any

@IonicPage()
@Component({
  selector: 'page-google-maps',
  templateUrl: 'google-maps.html',
})
export class GoogleMapsPage {

  @ViewChild('map') mapRef: ElementRef
  
  map:any;
  params:any
  Nombre:string
  Latitud :number = 0;
  Longitud:number = 0;

  constructor(public navCtrl: NavController, public navParams: NavParams)
   {
    this.params = this.navParams.get("params");  
    this.obtener_parametros();
  }


  ionViewDidLoad() {
    this.show_map();
  }

  show_map()
  {
    const location = new google.maps.LatLng(this.Latitud, this.Longitud)
   
    //Maps option
    const options = {
      center : location,
      zoom : 14
    }
    this.map = new google.maps.Map(this.mapRef.nativeElement,
    options)
    this.addMarket(location, this.map)
  }

  addMarket(position, map)
  {
    return new google.maps.Marker(
      {
        position, map
      }
    )
  }

  obtener_parametros()
  {
    this.Nombre = this.params.Nombre;
    this.Latitud = this.params.Latitud;
    this.Longitud = this.params.Longitud
  }

}
