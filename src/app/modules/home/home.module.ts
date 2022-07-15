import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SwiperModule } from 'swiper/angular';
import { CoreComponentsModule } from '../../core/components/core-components.module';
import { HomeComponent } from './home.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  }
];

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SwiperModule,
    CoreComponentsModule
  ]
})
export class HomeModule { }
