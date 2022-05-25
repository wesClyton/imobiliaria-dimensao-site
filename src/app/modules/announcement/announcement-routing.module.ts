import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AnnouncementDetailComponent } from './pages/detail/announcement-detail.component';
import { AnnouncementListComponent } from './pages/list/announcement-list.component';

const routes: Routes = [
  {
    path: '',
    component: AnnouncementListComponent
  },
  {
    path: ':type',
    component: AnnouncementListComponent
  },
  {
    path: ':title/:code',
    component: AnnouncementDetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AnnouncementRoutingModule { }
