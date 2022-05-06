import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ANNOUNCEMENT_CONFIG } from './modules/announcement/announcement.config';
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
    path: ANNOUNCEMENT_CONFIG.path,
    loadChildren: () => import('./modules/announcement/announcement.module').then(m => m.AnnouncementModule)
  },
  {
    path: 'contato',
    loadChildren: () => import('./modules/contact/contact.module').then(m => m.ContactModule)
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
