import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ApadrinarPage } from './apadrinar.page';

const routes: Routes = [
  {
    path: '',
    component: ApadrinarPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ApadrinarPageRoutingModule {}
