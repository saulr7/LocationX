import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireAuth  } from "angularfire2/auth";


@Injectable()
export class AuthProvider {

  authState: any = null;

  constructor(
     public http: HttpClient 
    
    )
    {    }



}
