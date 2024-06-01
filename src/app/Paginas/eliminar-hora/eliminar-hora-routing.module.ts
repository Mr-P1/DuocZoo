import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EliminarHoraPage } from './eliminar-hora.page';

const routes: Routes = [
  {
    path: '',
    component: EliminarHoraPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EliminarHoraPageRoutingModule {}
