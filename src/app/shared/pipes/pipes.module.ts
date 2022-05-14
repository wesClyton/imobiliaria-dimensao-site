import { NgModule } from '@angular/core';
import { NgxMaskModule } from 'ngx-mask';
import { CityStatePipe } from './city-state/city-state.pipe';
import { CurrencyBrPipe } from './currency-br/currency-br.pipe';
import { M2Pipe } from './m2/m2.pipe';
import { PathImagePipe } from './path-image/path-image.pipe';
import { PhonePipe } from './phone/phone.pipe';

@NgModule({
  declarations: [
    PhonePipe,
    M2Pipe,
    CurrencyBrPipe,
    PathImagePipe,
    CityStatePipe
  ],
  imports: [NgxMaskModule.forRoot()],
  exports: [
    PhonePipe,
    M2Pipe,
    CurrencyBrPipe,
    PathImagePipe,
    CityStatePipe
  ]
})
export class PipesModule {}
