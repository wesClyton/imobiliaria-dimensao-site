import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AnchorContactModule } from 'src/app/shared/components/anchor-contact/anchor-contact.module';
import { ButtonWhatsappModule } from 'src/app/shared/components/button-whatsapp/button-whatsapp.module';
import { BrokerComponent } from './broker.component';

const routes: Routes = [
  {
    path: '',
    component: BrokerComponent
  }
];

@NgModule({
  declarations: [ BrokerComponent ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    AnchorContactModule,
    ButtonWhatsappModule
  ]
})
export class BrokerModule {}
