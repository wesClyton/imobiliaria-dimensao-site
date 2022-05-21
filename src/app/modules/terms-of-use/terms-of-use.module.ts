import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TermsOfUseComponent } from './terms-of-use.component';

const routes: Routes = [
  {
    path: '',
    component: TermsOfUseComponent
  }
];

@NgModule({
  declarations: [ TermsOfUseComponent ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class TermsOfUseModule {}
