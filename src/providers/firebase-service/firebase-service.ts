
import { Injectable } from '@angular/core';

//Firebase
import { AngularFireDatabase } from '@angular/fire/database/database';
import { AngularFireStorage } from "@angular/fire/storage/storage";


@Injectable()
export class FirebaseServiceProvider {


  constructor(   public afDB: AngularFireDatabase,
  public atST:AngularFireStorage ) 
  {   }
  
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
  
}
