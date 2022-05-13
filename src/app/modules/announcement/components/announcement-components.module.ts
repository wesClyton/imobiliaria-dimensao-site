import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { DirectivesModule } from '../../../shared/directives/directives.module';
import { PipesModule } from '../../../shared/pipes/pipes.module';
import { CityDirectivesModule } from '../../city/directives/city-directives.module';
import { AnnouncementDirectivesModule } from '../directives/announcement-directives.module';
import { AnnouncementPipesModule } from '../pipes/announcement-pipes.module';
import { AnnouncementListItemComponent } from './list-item/announcement-list-item.component';
import { AnnouncementSearchComponent } from './search/announcement-search.component';

@NgModule({
  declarations: [
    AnnouncementSearchComponent,
    AnnouncementListItemComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DirectivesModule,
    AnnouncementDirectivesModule,
    CityDirectivesModule,
    AnnouncementPipesModule,
    PipesModule
  ],
  exports: [
    AnnouncementSearchComponent,
    AnnouncementListItemComponent
  ]
})
export class AnnouncementComponentModule {}
