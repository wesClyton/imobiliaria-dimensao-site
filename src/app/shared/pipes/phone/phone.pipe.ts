import { Pipe, PipeTransform } from '@angular/core';
import { MaskApplierService } from 'ngx-mask';

@Pipe({
  name: 'phone'
})
export class PhonePipe implements PipeTransform {

  constructor(
    private readonly maskApplierService: MaskApplierService
  ) {}

  transform(value: string): string {
    const mask = this.hasNinthDigit(value) ? '(00) 0 0000-0000' : '(00) 0000-0000';
    this.maskApplierService.prefix = '';
    this.maskApplierService.suffix = '';
    return this.maskApplierService.applyMask(value, mask);
  }

  private hasNinthDigit(value: string): boolean {
    return value.length > 10;
  }

}
