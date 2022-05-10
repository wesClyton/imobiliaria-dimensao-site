import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { AnchorContactModule } from 'src/app/shared/components/anchor-contact/anchor-contact.module';
import { ButtonWhatsappModule } from 'src/app/shared/components/button-whatsapp/button-whatsapp.module';
import { DirectivesModule } from '../../shared/directives/directives.module';
import { AnnouncementDirectivesModule } from '../announcement/directives/announcement-directives.module';
import { AnnounceComponent } from './announce.component';

const routes: Routes = [
  {
    path: '',
    component: AnnounceComponent
  }
];

@NgModule({
  declarations: [ AnnounceComponent ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    AnchorContactModule,
    ButtonWhatsappModule,
    AnnouncementDirectivesModule,
    DirectivesModule
  ]
})
export class AnnounceModule {}
