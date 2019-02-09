
import { Injectable } from '@angular/core';

//Firebase
import { AngularFireDatabase } from '@angular/fire/database/database';
import { AngularFireStorage } from "@angular/fire/storage/storage";
import { AlmacenamientoServiceProvider } from "../almacenamiento-service/almacenamiento-service"
import { ClassGetter } from '@angular/compiler/src/output/output_ast';


@Injectable()
export class FirebaseServiceProvider {


  constructor
  (   
      private afDB: AngularFireDatabase
    // , private atST:AngularFireStorage
    , private almacenamientoService: AlmacenamientoServiceProvider
  ) 
  {  }
  
  public ObtenerRubros()
  {
    return this.afDB.list('RubrosV2');
  }


  public ObtenerSubRubros(subRubro)
  {
    return this.afDB.list('SubRubros/'+subRubro);
  }

  public ObtenerNegocios(negocio)
  {
    return this.afDB.database.ref('/Negocios/'+negocio)
  }


  public ObtenerEntidad(entidad)
  {
    if (!entidad)
      throw "Es necesaria una entidad para hacer la busqueda";

    return this.afDB.database.ref("/Entidades/").child(entidad);

  }

  public ObteneSucursales(entidad)
  {
    return this.afDB.list("Sucursales/"+entidad);
  }

  public AgregarFavorito(entidad)
  {
    return this.almacenamientoService.getUserId().then((userId) =>
    {
      this.afDB.list("Favoritos/" +userId).set(entidad,entidad);
    })

  }

  public QuitarFavorito(entidad)
  {
    return this.almacenamientoService.getUserId().then((userId) =>
    {
      this.afDB.list("Favoritos/" + userId).remove(entidad);
    })

  }

  public ObtenerFavoritos(usuarioId)
  {
      return this.afDB.list("Favoritos/"+usuarioId);
  }

  
  public RegistrarOtraVisita(entidad:string)
  {
    if(!entidad)
    return;

    var visitasRef = this.afDB.database.ref("/Estadisticas/Metricas/Visitas/"+entidad);
    visitasRef.once("value" , visitas =>
    {
      var totalVisitas =  (visitas.val() ? visitas.val() : 0 ) +1
      visitasRef.set (totalVisitas)
    }) 
  }

  public ObtenerVisitas(entidad:string)
  {
    if(!entidad)
    return;

    return this.afDB.database.ref("/Estadisticas/Metricas/Visitas/"+entidad);
  
  }

  public ObtenerConteoFavoritos(entidad:string)
  {
  
    if(!entidad)
      return;

    return this.afDB.database.ref("/Estadisticas/Metricas/Favoritos/"+entidad);

  }

  public RegistrarOtroFavorito(entidad:string, sumar:boolean=true)
  {
    if(!entidad)
      return;

    var favoritosRef = this.afDB.database.ref("/Estadisticas/Metricas/Favoritos/"+entidad );
    favoritosRef.once("value" , visitas =>
    {
      var totalVisitas

      if (sumar)       
        totalVisitas =  (visitas.val() ? visitas.val() : 0 ) +1
      else
        totalVisitas =  (visitas.val() > 0 ? visitas.val() -1 : 0 )

      favoritosRef.set( totalVisitas )
    }) 
  }

  public EntidadesMasVisitadas()
  {

    var entidad = {
      entidad : "",
      valor : 0
    }

    var entidades = [];

    return this.afDB.database.ref("/Estadisticas/Metricas/Visitas")
    .orderByValue().limitToLast(20)
    .once("value")

  }

  public ObtenerCiudades()
  {
    return this.afDB.database.ref("/Ciudades")
  }

  public obtener_sucursales(entidadId)
  {
    if(!entidadId)
      return
    return this.afDB.database.ref("/Sucursales/"+entidadId)
  }

  public tiene_sucursales(entidadId)
  {
    if(!entidadId)
      return
    return this.afDB.database.ref("/Sucursales/"+entidadId).limitToFirst(1)
  }

}
