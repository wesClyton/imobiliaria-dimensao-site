import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AnnouncementRoutingModule } from './announcement-routing.module';
import { AnnouncementPagesModule } from './pages/announcement-pages.module';

@NgModule({
  imports: [
    CommonModule,
    AnnouncementRoutingModule,
    AnnouncementPagesModule
  ]
})
export class AnnouncementModule { }
