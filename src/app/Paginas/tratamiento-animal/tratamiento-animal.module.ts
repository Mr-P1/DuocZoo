import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { IonicModule } from '@ionic/angular';
import { ApiZooService } from '../../Servicio/api-zoo.service'
import { TratamientoAnimalPageRoutingModule } from './tratamiento-animal-routing.module';

import { TratamientoAnimalPage } from './tratamiento-animal.page';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonicModule,
    TratamientoAnimalPageRoutingModule,
    HttpClientModule
  ],
  declarations: [TratamientoAnimalPage],
  providers:[ApiZooService]
})
export class TratamientoAnimalPageModule {}
