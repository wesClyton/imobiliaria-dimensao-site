import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AnnouncementComponentModule } from '../components/announcement-components.module';
import { AnnouncementDetailComponent } from './detail/announcement-detail.component';
import { AnnouncementListComponent } from './list/announcement-list.component';

@NgModule({
  declarations: [
    AnnouncementListComponent,
    AnnouncementDetailComponent
  ],
  imports: [
    CommonModule,
    AnnouncementComponentModule
  ],
  exports: [
    AnnouncementListComponent,
    AnnouncementDetailComponent
  ]
})
export class AnnouncementPagesModule { }
