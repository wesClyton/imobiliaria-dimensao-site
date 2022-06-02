import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AnchorContactModule } from '../../../shared/components/anchor-contact/anchor-contact.module';
import { ButtonWhatsappModule } from '../../../shared/components/button-whatsapp/button-whatsapp.module';
import { PipesModule } from '../../../shared/pipes/pipes.module';
import { CityDirectivesModule } from '../../city/directives/city-directives.module';
import { EnterpriseGetAllResolver } from '../resolvers/enterprise-get-all.resolver';
import { EnterpriseComponent } from './list/enterprise.component';

const routes: Routes = [
  {
    path: '',
    component: EnterpriseComponent,
    resolve: {
      enterpriseGetAll: EnterpriseGetAllResolver
    }
  }
];

@NgModule({
  declarations: [EnterpriseComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    AnchorContactModule,
    ButtonWhatsappModule,
    CityDirectivesModule,
    PipesModule
  ]
})
export class EnterprisePagesModule { }
