import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http'
import { IonicModule } from '@ionic/angular';
import {ApiZooService} from '../../Servicio/api-zoo.service'
import { ListarAdminPageRoutingModule } from './listar-admin-routing.module';

import { ListarAdminPage } from './listar-admin.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListarAdminPageRoutingModule,
    HttpClientModule,

  ],
  declarations: [ListarAdminPage],
  providers:[ApiZooService]
})
export class ListarAdminPageModule {}
