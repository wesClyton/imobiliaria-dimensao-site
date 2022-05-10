import { NgModule } from '@angular/core';
import { NgxMaskModule } from 'ngx-mask';
import { CurrencyBrDirective } from './currency-br/currency-br.directive';
import { M2Directive } from './m2/m2.directive';
import { PhoneDirective } from './phone/phone.directive';

@NgModule({
  declarations: [
    PhoneDirective,
    M2Directive,
    CurrencyBrDirective
  ],
  imports: [NgxMaskModule.forRoot()],
  exports: [
    PhoneDirective,
    M2Directive,
    CurrencyBrDirective
  ]
})
export class DirectivesModule {}
