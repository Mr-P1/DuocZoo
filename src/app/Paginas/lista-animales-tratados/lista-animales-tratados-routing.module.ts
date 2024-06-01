import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListaAnimalesTratadosPage } from './lista-animales-tratados.page';

const routes: Routes = [
  {
    path: '',
    component: ListaAnimalesTratadosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListaAnimalesTratadosPageRoutingModule {}
