import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { SwiperModule } from 'swiper/angular';
import { YoutubeIframeModule } from '../../../shared/components/youtube-iframe/youtube-iframe.module';
import { DirectivesModule } from '../../../shared/directives/directives.module';
import { PipesModule } from '../../../shared/pipes/pipes.module';
import { CityDirectivesModule } from '../../city/directives/city-directives.module';
import { AnnouncementDirectivesModule } from '../directives/announcement-directives.module';
import { AnnouncementPipesModule } from '../pipes/announcement-pipes.module';
import { AnnouncementGalleryComponent } from './gallery/announcement-gallery.component';
import { AnnouncementListItemComponent } from './list-item/announcement-list-item.component';
import { AnnouncementSearchComponent } from './search/announcement-search.component';

@NgModule({
  declarations: [
    AnnouncementSearchComponent,
    AnnouncementListItemComponent,
    AnnouncementGalleryComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    DirectivesModule,
    AnnouncementDirectivesModule,
    CityDirectivesModule,
    AnnouncementPipesModule,
    PipesModule,
    SwiperModule,
    MatIconModule,
    YoutubeIframeModule
  ],
  exports: [
    AnnouncementSearchComponent,
    AnnouncementListItemComponent,
    AnnouncementGalleryComponent
  ]
})
export class AnnouncementComponentModule {}
