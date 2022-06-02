import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EnterprisePagesModule } from './pages/enterprise-pages.module';

@NgModule({
  imports: [
    CommonModule,
    EnterprisePagesModule
  ]
})
export class EnterpriseModule { }
