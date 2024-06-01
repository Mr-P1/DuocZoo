import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModificarHoraPage } from './modificar-hora.page';

const routes: Routes = [
  {
    path: '',
    component: ModificarHoraPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModificarHoraPageRoutingModule {}
