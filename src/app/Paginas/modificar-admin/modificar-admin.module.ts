import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { IonicModule } from '@ionic/angular';
import {ApiZooService} from '../../Servicio/api-zoo.service';
import { ModificarAdminPageRoutingModule } from './modificar-admin-routing.module';

import { ModificarAdminPage } from './modificar-admin.page';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonicModule,
    ModificarAdminPageRoutingModule,
    HttpClientModule
  ],
  declarations: [ModificarAdminPage],
  providers:[ApiZooService]
})
export class ModificarAdminPageModule {}
