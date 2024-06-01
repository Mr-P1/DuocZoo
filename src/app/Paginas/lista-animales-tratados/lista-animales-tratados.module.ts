import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import {HttpClientModule} from '@angular/common/http'
import { ListaAnimalesTratadosPageRoutingModule } from './lista-animales-tratados-routing.module';
import {ApiZooService} from '../../Servicio/api-zoo.service'
import { ListaAnimalesTratadosPage } from './lista-animales-tratados.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListaAnimalesTratadosPageRoutingModule,
    HttpClientModule
  ],
  declarations: [ListaAnimalesTratadosPage],
  providers: [ApiZooService]
})
export class ListaAnimalesTratadosPageModule {}
