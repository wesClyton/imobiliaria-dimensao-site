import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AnnouncementTypeOptionSelectDirective } from './announcement-asd-option-select/announcement-type-option-select.directive';

@NgModule({
  declarations: [
    AnnouncementTypeOptionSelectDirective
  ],
  imports: [CommonModule],
  exports: [
    AnnouncementTypeOptionSelectDirective
  ]
})
export class AnnouncementDirectivesModule { }
