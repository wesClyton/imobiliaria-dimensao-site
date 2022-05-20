import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { DirectivesModule } from '../../../shared/directives/directives.module';
import { PipesModule } from '../../../shared/pipes/pipes.module';
import { AnnouncementComponentModule } from '../components/announcement-components.module';
import { AnnouncementPipesModule } from '../pipes/announcement-pipes.module';
import { AnnouncementDetailComponent } from './detail/announcement-detail.component';
import { AnnouncementListComponent } from './list/announcement-list.component';

@NgModule({
  declarations: [
    AnnouncementListComponent,
    AnnouncementDetailComponent
  ],
  imports: [
    CommonModule,
    AnnouncementComponentModule,
    AnnouncementPipesModule,
    ReactiveFormsModule,
    PipesModule,
    DirectivesModule
  ],
  exports: [
    AnnouncementListComponent,
    AnnouncementDetailComponent
  ]
})
export class AnnouncementPagesModule { }
