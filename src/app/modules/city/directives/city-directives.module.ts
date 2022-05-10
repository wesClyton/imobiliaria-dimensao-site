import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CityOptionSelectDirective } from './city-option-select/city-option-select.directive';

@NgModule({
  declarations: [CityOptionSelectDirective],
  imports: [CommonModule],
  exports: [CityOptionSelectDirective]
})
export class CityDirectivesModule { }
