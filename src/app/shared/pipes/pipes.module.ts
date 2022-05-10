import { NgModule } from '@angular/core';
import { NgxMaskModule } from 'ngx-mask';
import { CurrencyBrPipe } from './currency-br/currency-br.pipe';
import { M2Pipe } from './m2/m2.pipe';
import { PhonePipe } from './phone/phone.pipe';

@NgModule({
  declarations: [
    PhonePipe,
    M2Pipe,
    CurrencyBrPipe
  ],
  imports: [NgxMaskModule.forRoot()],
  exports: [
    PhonePipe,
    M2Pipe,
    CurrencyBrPipe
  ]
})
export class PipesModule {}
