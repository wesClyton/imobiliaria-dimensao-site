import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageErroComponent } from './page-erro/page-erro.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'erro',
    pathMatch: 'full'
  },
  {
    path: 'erro',
    component: PageErroComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PageRoutingModule { }
