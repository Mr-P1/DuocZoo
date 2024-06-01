import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import {ApiZooService} from '../../Servicio/api-zoo.service';
import { ApadrinarPageRoutingModule } from './apadrinar-routing.module';
import {HttpClientModule} from '@angular/common/http';
import { ApadrinarPage } from './apadrinar.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ApadrinarPageRoutingModule,
    HttpClientModule,
  ],
  declarations: [ApadrinarPage],
  providers:[ApiZooService]
})
export class ApadrinarPageModule {}
