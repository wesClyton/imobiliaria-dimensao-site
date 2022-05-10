import { Pipe, PipeTransform } from '@angular/core';
import { MaskApplierService } from 'ngx-mask';

@Pipe({
  name: 'currencyBr'
})
export class CurrencyBrPipe implements PipeTransform {

  constructor(
    private readonly maskApplierService: MaskApplierService
  ) {}

  transform(value: string): string {
    this.maskApplierService.thousandSeparator = '.';
    const valueFormated = this.maskApplierService.applyMask(value, 'separator.2');
    return `R$ ${valueFormated}`;
  }

}
