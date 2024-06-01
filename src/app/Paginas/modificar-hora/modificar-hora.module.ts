import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModificarHoraPageRoutingModule } from './modificar-hora-routing.module';

import { ModificarHoraPage } from './modificar-hora.page';
import { ApiZooService } from 'src/app/Servicio/api-zoo.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModificarHoraPageRoutingModule,
    HttpClientModule
  ],
  declarations: [ModificarHoraPage],
  providers:[ApiZooService]
})
export class ModificarHoraPageModule {}
