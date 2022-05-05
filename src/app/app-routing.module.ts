import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { APP_CONFIG } from './app.config';
import { PAGES_CONFIG } from './pages/page.config';

const routes: Routes = [
  {
    path: APP_CONFIG.path,
    loadChildren: () => import('./modules/home/home.module').then(m => m.HomeModule)
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
