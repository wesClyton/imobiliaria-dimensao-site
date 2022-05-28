import { Pipe, PipeTransform } from '@angular/core';
import { MaskApplierService } from 'ngx-mask';

@Pipe({
  name: 'm2'
})
export class M2Pipe implements PipeTransform {

  constructor(
    private readonly maskApplierService: MaskApplierService
  ) { }

  transform(value: string | number, inDirective: boolean = false): string {
    value = typeof value === 'number' ? value.toString() : value;

    let thousand!: string;
    let decimal!: string;
    let formated!: string;
    if (value && !inDirective) {
      if (!value.includes('.')) {
        value = `${value}.00`;
      }
      if (value.includes('.')) {
        decimal = value.substring(value.length - 2, value.length);
        if (decimal.includes('.')) {
          value = `${value}0`;
        }
      }
      thousand = value.substring(0, value.length - 2);
      decimal = value.substring(value.length - 2, value.length);
      formated = thousand ? `${thousand},${decimal}` : '0';
    }

    this.maskApplierService.thousandSeparator = '.';
    this.maskApplierService.prefix = '';
    this.maskApplierService.suffix = !inDirective ? 'm²' : '';
    return this.maskApplierService.applyMask(formated ? formated : value, 'separator.2');
  }

}
