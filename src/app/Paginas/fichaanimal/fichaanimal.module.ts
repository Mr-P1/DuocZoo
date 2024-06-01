import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {ReactiveFormsModule} from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { HttpClientModule } from '@angular/common/http'; 

import { FichaanimalPageRoutingModule } from './fichaanimal-routing.module';

import { FichaanimalPage } from './fichaanimal.page';
import {ApiZooService} from './../../Servicio/api-zoo.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FichaanimalPageRoutingModule,
    HttpClientModule
  ],
  declarations: [FichaanimalPage],
  providers: [ApiZooService]
})
export class FichaanimalPageModule {}
