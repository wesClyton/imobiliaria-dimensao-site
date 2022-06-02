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
    path: 'anuncie',
    loadChildren: () => import('./modules/announce/announce.module').then(m => m.AnnounceModule)
  },
  {
    path: 'corretores',
    loadChildren: () => import('./modules/broker/broker.module').then(m => m.BrokerModule)
  },
  {
    path: 'empreendimentos',
    loadChildren: () => import('./modules/enterprise/enterprise.module').then(m => m.EnterpriseModule)
  },
  {
    path: 'onde-encontrar',
    loadChildren: () => import('./modules/discover/discover.module').then(m => m.DiscoverModule)
  },
  {
    path: 'termos-de-uso',
    loadChildren: () => import('./modules/terms-of-use/terms-of-use.module').then(m => m.TermsOfUseModule)
  },
  {
    path: 'politica-de-privacidade',
    loadChildren: () => import('./modules/privacy-policy/privacy-policy.module').then(m => m.PrivacyPolicyModule)
  },
  {
    path: PAGES_CONFIG.path,
    loadChildren: () => import('./pages/page.module').then(m => m.PageModule)
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
