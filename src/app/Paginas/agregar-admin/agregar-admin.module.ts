import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { IonicModule } from '@ionic/angular';
import {ApiZooService} from '../../Servicio/api-zoo.service';
import { AgregarAdminPageRoutingModule } from './agregar-admin-routing.module';

import { AgregarAdminPage } from './agregar-admin.page';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonicModule,
    AgregarAdminPageRoutingModule,
    HttpClientModule
  ],
  declarations: [AgregarAdminPage],
  providers:[ApiZooService]
})
export class AgregarAdminPageModule {}
