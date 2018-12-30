// import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from "@ionic/storage";


@Injectable()
export class AlmacenamientoServiceProvider {

  constructor
    (
      private storage: Storage
    ) 
    {  }

  public GuardarEntidadLocal(Entidad)
  {
    this.storage.get("Entidades").then((entidades) =>
    {
   
      var listaEntidades:any

      if (entidades == null) 
        listaEntidades =  JSON.stringify(Entidad);  
      else
        listaEntidades = entidades +","+ JSON.stringify(Entidad);  
      
        this.storage.set("Entidades",listaEntidades);
    });
  }

  public RemoverEntidadLocal(Entidad)
  {
    //this.storage.remove("Entidades")
    this.storage.get("Entidades").then((entidades) =>
    {  
      var listaEntidades:any
      listaEntidades = JSON.parse("["+ entidades +"]") 

      console.log(listaEntidades)

      for (let i = 0; i < listaEntidades.length; i++)
       {
        console.log(listaEntidades[i])
        if ( listaEntidades[i].Entidad == Entidad.Entidad) 
         {
            delete listaEntidades[i];
            break;
         }
        }

        listaEntidades = JSON.stringify(listaEntidades);  
      
        this.storage.set("Entidades",listaEntidades);
    });

  }

  public ObternerEntidades()
  {
    return this.storage.get("Entidades");
  }


  public Login()
  {
    this.storage.set("LoggIn", true)
    console.log("LogIn")
  }

  public LogOut()
  {
      this.storage.set("LoggIn", false)
      console.log("LogOut")
  }

  public IsLogIn()
  {
    console.log("IsLogin")
    console.log( (this.storage.get("LoggIn")) ? this.storage.get("LoggIn") : false )
    //return (this.storage.get("LoggIn") !== null) ? this.storage.get("LoggIn") : false

    return this.storage.get("LoggIn")
  //   return (this.storage.get("LoggIn").then((logeado)=>
  //   {
  //       console.log(logeado)
  //   }).catch((error)=>
  //   {
  //     console.log(error)
  //   })
  //   //return this.storage.get("LoggIn")
   }



}
