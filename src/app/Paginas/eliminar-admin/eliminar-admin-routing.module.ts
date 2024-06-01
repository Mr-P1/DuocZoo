import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EliminarAdminPage } from './eliminar-admin.page';

const routes: Routes = [
  {
    path: '',
    component: EliminarAdminPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EliminarAdminPageRoutingModule {}
