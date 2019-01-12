
import { Injectable } from '@angular/core';

//Firebase
import { AngularFireDatabase } from '@angular/fire/database/database';
import { AngularFireStorage } from "@angular/fire/storage/storage";
import { AlmacenamientoServiceProvider } from "../almacenamiento-service/almacenamiento-service"


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
      this.afDB.list("Favoritos/" +userId).set(entidad.Entidad,entidad);
    })

  }

  public QuitarFavorito(entidad)
  {
    return this.almacenamientoService.getUserId().then((userId) =>
    {
      this.afDB.list("Favoritos/" + userId).remove(entidad.Entidad);
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

    var visitasRef = this.afDB.database.ref("Estadisticas/Visitas/"+entidad);
    visitasRef.once("value" , visitas =>
    {
      var totalVisitas =  (visitas.val() ? visitas.val() : 0 ) +1
      console.log(totalVisitas)
      visitasRef.set (totalVisitas)
    }) 
  }

  public RegistrarOtroFavorito(entidad:string, sumar:boolean=true)
  {
    if(!entidad)
      return;

    var favoritosRef = this.afDB.database.ref("/Estadisticas/Favoritos/"+entidad );
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
    var entidadesMasVisitadas = this.afDB.database.ref("Estadisticas").orderByChild("Metricas/Visitas")

    console.log(entidadesMasVisitadas)

    entidadesMasVisitadas.once("value" , respuesta =>
  {
    console.log(respuesta.val())

  })

  }

}
