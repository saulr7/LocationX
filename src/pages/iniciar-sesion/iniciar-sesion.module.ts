import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { IniciarSesionPage } from './iniciar-sesion';

@NgModule({
  declarations: [
    IniciarSesionPage,
  ],
  imports: [
    IonicPageModule.forChild(IniciarSesionPage),
  ],
})
export class IniciarSesionPageModule {}
