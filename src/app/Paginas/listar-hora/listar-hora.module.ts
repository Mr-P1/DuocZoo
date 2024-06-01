import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListarHoraPageRoutingModule } from './listar-hora-routing.module';
import {ApiZooService} from '../../Servicio/api-zoo.service';
import { HttpClientModule } from '@angular/common/http';

import { ListarHoraPage } from './listar-hora.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListarHoraPageRoutingModule,
    HttpClientModule
  ],
  declarations: [ListarHoraPage],
  providers:[ApiZooService]
})
export class ListarHoraPageModule {}
