import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AnnouncementDetailComponent } from './pages/detail/announcement-detail.component';
import { AnnouncementListComponent } from './pages/list/announcement-list.component';
import { AnnouncementGeByIdResolver } from './resolvers/announcement-get-by-id.resolver';

const routes: Routes = [
  {
    path: '',
    component: AnnouncementListComponent
  },
  {
    path: ':title/:code',
    resolve: {
      announcement: AnnouncementGeByIdResolver
    },
    component: AnnouncementDetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AnnouncementRoutingModule { }
