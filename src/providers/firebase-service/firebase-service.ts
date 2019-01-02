
import { Injectable } from '@angular/core';

//Firebase
import { AngularFireDatabase } from '@angular/fire/database/database';
import { AngularFireStorage } from "@angular/fire/storage/storage";
import { AlmacenamientoServiceProvider } from "../almacenamiento-service/almacenamiento-service"


@Injectable()
export class FirebaseServiceProvider {


  constructor(   
      public afDB: AngularFireDatabase
    , public atST:AngularFireStorage
    , private almacenamientoService: AlmacenamientoServiceProvider
  ) 
  {   
    
  }
  
  public ObtenerRubros()
  {
    //return this.afDB.list('rubros');
    return this.afDB.list('RubrosV2');
  }


  public ObtenerSubRubros(subRubro)
  {
    //return this.afDB.list('rubros/'+subRubro);
    return this.afDB.list('SubRubros/'+subRubro);
  }

  public ObtenerNegocios(negocio)
  {
    //return this.afDB.list('rubros/'+"Educación/"+negocio);
    return this.afDB.list('Negocios/'+negocio);
  }

  public ObtenerUrl(FileName)
  {
    this.atST.storage.ref('Img/Rubros/Finanzas.jpg').getDownloadURL().then(function(data){
      return data;
    })
  }


  public NuevaUrl(Archivo)
  {
    return this.atST.storage.ref('Img/Rubros/Finanzas.jpg');
  }
  
  public ObtenerEntidad(entidad)
  {
    return this.afDB.list("Entidades/"+entidad);

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


}
