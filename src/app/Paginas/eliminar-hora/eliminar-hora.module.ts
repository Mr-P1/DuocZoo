import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EliminarHoraPageRoutingModule } from './eliminar-hora-routing.module';

import { EliminarHoraPage } from './eliminar-hora.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EliminarHoraPageRoutingModule
  ],
  declarations: [EliminarHoraPage]
})
export class EliminarHoraPageModule {}
