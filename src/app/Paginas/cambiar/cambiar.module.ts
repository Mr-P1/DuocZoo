import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CambiarPageRoutingModule } from './cambiar-routing.module';

import { CambiarPage } from './cambiar.page';
import { HttpClientModule } from '@angular/common/http';
import { ApiZooService } from 'src/app/Servicio/api-zoo.service';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonicModule,
    CambiarPageRoutingModule,HttpClientModule
  ],
  declarations: [CambiarPage],
  providers:[ApiZooService]
})
export class CambiarPageModule {}
