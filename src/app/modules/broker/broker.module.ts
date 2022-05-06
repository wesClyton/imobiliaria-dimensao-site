import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
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
    RouterModule.forChild(routes)
  ]
})
export class BrokerModule {}
