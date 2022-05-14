import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { DiscoverComponent } from './discover.component';
import { GoogleMapsModule } from '@angular/google-maps';
import { PipesModule } from 'src/app/shared/pipes/pipes.module';
import { AnnouncementPipesModule } from '../announcement/pipes/announcement-pipes.module';

const routes: Routes = [
  {
    path: '',
    component: DiscoverComponent,
  },
];

@NgModule({
  declarations: [DiscoverComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    GoogleMapsModule,
    PipesModule,
    AnnouncementPipesModule
  ],
})
export class DiscoverModule {}
