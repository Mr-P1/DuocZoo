import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { IonicModule } from '@ionic/angular';
import {ApiZooService} from '../../Servicio/api-zoo.service';
import { InicioUsuarioPageRoutingModule } from './inicio-usuario-routing.module';

import { InicioUsuarioPage } from './inicio-usuario.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InicioUsuarioPageRoutingModule,
    HttpClientModule
  ],
  declarations: [InicioUsuarioPage],
  providers:[ApiZooService]
})
export class InicioUsuarioPageModule {}
