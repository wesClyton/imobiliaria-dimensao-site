import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { DirectivesModule } from '../../../shared/directives/directives.module';
import { CityDirectivesModule } from '../../city/directives/city-directives.module';
import { AnnouncementDirectivesModule } from '../directives/announcement-directives.module';
import { AnnouncementSearchComponent } from './search/announcement-search.component';

@NgModule({
  declarations: [AnnouncementSearchComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DirectivesModule,
    AnnouncementDirectivesModule,
    CityDirectivesModule
  ],
  exports: [AnnouncementSearchComponent]
})
export class AnnouncementComponentModule {}
