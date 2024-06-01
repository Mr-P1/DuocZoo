import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { IonicModule } from '@ionic/angular';
import {ApiZooService} from '../../Servicio/api-zoo.service';
import { PagoPageRoutingModule } from './pago-routing.module';

import { PagoPage } from './pago.page';
import {PruebaPaypalComponent} from './../prueba-paypal/prueba-paypal.component'

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PagoPageRoutingModule,
    HttpClientModule,
    
  ],
  declarations: [PagoPage],
  providers:[ApiZooService]
  
})
export class PagoPageModule {}
