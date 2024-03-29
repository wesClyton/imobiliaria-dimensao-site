import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AnchorContactModule } from '../../../shared/components/anchor-contact/anchor-contact.module';
import { ButtonWhatsappModule } from '../../../shared/components/button-whatsapp/button-whatsapp.module';
import { PipesModule } from '../../../shared/pipes/pipes.module';
import { BrokerGetAllResolver } from '../resolvers/broker-get-all.resolver';
import { BrokerComponent } from './list/broker.component';

const routes: Routes = [
  {
    path: '',
    component: BrokerComponent,
    resolve: {
      brokerGetAll: BrokerGetAllResolver
    }
  }
];

@NgModule({
  declarations: [ BrokerComponent ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    AnchorContactModule,
    ButtonWhatsappModule,
    PipesModule
  ]
})
export class BrokerPagesModule {}
