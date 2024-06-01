import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { IonicModule } from '@ionic/angular';
import {ApiZooService} from '../../Servicio/api-zoo.service';
import { PerfilusuarioPageRoutingModule } from './perfilusuario-routing.module';

import { PerfilusuarioPage } from './perfilusuario.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PerfilusuarioPageRoutingModule,
    HttpClientModule
  ],
  declarations: [PerfilusuarioPage],
  providers:[ApiZooService]
})
export class PerfilusuarioPageModule {}
