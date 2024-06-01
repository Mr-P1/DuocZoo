import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {ReactiveFormsModule} from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import {HttpClientModule} from '@angular/common/http';
import {ApiZooService} from '../../Servicio/api-zoo.service';
import { AgregarAnimalPageRoutingModule } from './agregar-animal-routing.module';

import { AgregarAnimalPage } from './agregar-animal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AgregarAnimalPageRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  declarations: [AgregarAnimalPage],
  providers:[ApiZooService]
})
export class AgregarAnimalPageModule {}
