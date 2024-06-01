import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FichaanimalPage } from './fichaanimal.page';

const routes: Routes = [
  {
    path: '',
    component: FichaanimalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FichaanimalPageRoutingModule {}
