import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrokerPagesModule } from './pages/broker-pages.module';

@NgModule({
  imports: [
    CommonModule,
    BrokerPagesModule
  ]
})
export class BrokerModule { }
