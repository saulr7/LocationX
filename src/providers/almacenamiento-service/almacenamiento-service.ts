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


  public Login(user)
  {
    this.storage.set("LoggIn", true)
    this.storage.set("email", user.email)
    this.storage.set("userId", user.uid)
  }

  public LogOut()
  {
      this.storage.set("LoggIn", false)
      this.storage.set("email", null)
      this.storage.set("userId", null)
  }

  public IsLogIn()
  {
    return this.storage.get("LoggIn")
  }

  public saveEmailAccount(email:string)
  {
    this.storage.set("email", email)
  }

  public getEmailAccount()
  {
    return this.storage.get("email")
  }

  public getUserId()
  {
    return this.storage.get("userId")
  }


}
