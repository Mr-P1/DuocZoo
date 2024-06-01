import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import {ApiZooService} from '../../Servicio/api-zoo.service'
import { IonicModule } from '@ionic/angular';
import {HttpClientModule} from '@angular/common/http'
import { RegistrarsePageRoutingModule } from './registrarse-routing.module';

import { RegistrarsePage } from './registrarse.page';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonicModule,
    RegistrarsePageRoutingModule,
    HttpClientModule
  ],
  declarations: [RegistrarsePage],
  providers:[ApiZooService]
})
export class RegistrarsePageModule {}
