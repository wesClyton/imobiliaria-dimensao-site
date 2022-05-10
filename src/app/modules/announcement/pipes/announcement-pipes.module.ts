import { NgModule } from '@angular/core';
import { AnnouncementTypePipe } from './announcement-type/announcement-type.pipe';

@NgModule({
  declarations: [
    AnnouncementTypePipe
  ],
  exports: [
    AnnouncementTypePipe
  ]
})
export class AnnouncementPipesModule {}
