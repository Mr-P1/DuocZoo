import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AgregarAdminPage } from './agregar-admin.page';

const routes: Routes = [
  {
    path: '',
    component: AgregarAdminPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AgregarAdminPageRoutingModule {}
