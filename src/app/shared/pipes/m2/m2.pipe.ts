import { Pipe, PipeTransform } from '@angular/core';
import { MaskApplierService } from 'ngx-mask';

@Pipe({
  name: 'm2'
})
export class M2Pipe implements PipeTransform {

  constructor(
    private readonly maskApplierService: MaskApplierService
  ) {}

  transform(value: string | number, showSymbol = false): string {
    this.maskApplierService.thousandSeparator = '.';
    const valueFormated = this.maskApplierService.applyMask(value?.toString(), 'separator.2');
    return `${valueFormated}${showSymbol ? 'm²' : ''}`;
  }

}
