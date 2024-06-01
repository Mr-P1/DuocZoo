import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { IonicModule } from '@ionic/angular';
import {ApiZooService} from '../../Servicio/api-zoo.service';
import { EliminarAdminPageRoutingModule } from './eliminar-admin-routing.module';

import { EliminarAdminPage } from './eliminar-admin.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EliminarAdminPageRoutingModule,
    HttpClientModule
  ],
  declarations: [EliminarAdminPage],
  providers:[ApiZooService]
})
export class EliminarAdminPageModule {}
