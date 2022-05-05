import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { PageErroComponent } from './page-erro/page-erro.component';
import { PageRoutingModule } from './page-routing.module';

@NgModule({
  declarations: [PageErroComponent],
  imports: [
    CommonModule,
    PageRoutingModule,
    MatButtonModule,
    MatIconModule
  ]
})
export class PageModule { }
