import { Pipe, PipeTransform } from '@angular/core';
import { MaskApplierService } from 'ngx-mask';
import { StringUtil } from '../../utils/string.util';

@Pipe({
  name: 'currencyBr'
})
export class CurrencyBrPipe implements PipeTransform {

  constructor(
    private readonly maskApplierService: MaskApplierService
  ) { }

  transform(value: string | number, inDirective: boolean = false): string {
    value = typeof value === 'number' ? value.toString() : value;

    let formated!: string;
    if (value && !inDirective) {
      formated = StringUtil.formatMaskDecimalInValueLoaded(value);
    }

    this.maskApplierService.thousandSeparator = '.';
    this.maskApplierService.prefix = 'R$ ';
    this.maskApplierService.suffix = '';
    return this.maskApplierService.applyMask(formated ? formated : value, 'separator.2');
  }

}
