import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { YoutubeIframeComponent } from './youtube-iframe.component';

@NgModule({
  declarations: [
    YoutubeIframeComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    YoutubeIframeComponent
  ]
})
export class YoutubeIframeModule {}
