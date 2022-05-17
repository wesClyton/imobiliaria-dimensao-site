import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AnchorContactComponent } from './anchor-contact.component';

@NgModule({
  declarations: [
    AnchorContactComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    AnchorContactComponent
  ]
})
export class AnchorContactModule {}
