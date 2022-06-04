import { Pipe, PipeTransform } from '@angular/core';
import { MaskApplierService } from 'ngx-mask';
import { StringUtil } from '../../utils/string.util';

@Pipe({
  name: 'm2'
})
export class M2Pipe implements PipeTransform {

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
    this.maskApplierService.prefix = '';
    this.maskApplierService.suffix = !inDirective ? 'm²' : '';
    return this.maskApplierService.applyMask(formated ? formated : value, 'separator.2');
  }

}
