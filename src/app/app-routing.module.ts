import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PAGES_CONFIG } from './pages/page.config';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./modules/home/home.module').then(m => m.HomeModule)
  },
  {
    path: 'quem-somos',
    loadChildren: () => import('./modules/about/about.module').then(m => m.AboutModule)
  },
  {
    path: '**',
    redirectTo: PAGES_CONFIG.path,
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
