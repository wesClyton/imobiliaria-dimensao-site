import { Directive, ElementRef, HostListener, OnDestroy, OnInit } from '@angular/core';
import { NgControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { CurrencyBrPipe } from '../../pipes/currency-br/currency-br.pipe';

@Directive({
  selector: '[appCurrencyBr]',
  providers: [CurrencyBrPipe]
})
export class CurrencyBrDirective implements OnInit, OnDestroy {

  private subscription = new Subscription();

  constructor(
    private readonly currencyBrPipe: CurrencyBrPipe,
    private readonly ngControl: NgControl,
    private readonly elementRef: ElementRef
  ) {}

  ngOnInit(): void {
    this.setMask((this.elementRef.nativeElement as HTMLInputElement).value, true);
    this.subscription.add(this.ngControl.control?.valueChanges.subscribe(value => this.setMask(value)));
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  @HostListener('blur', ['$event'])
  private setDigits(event: any): void {
    const value: string = event.target.value;
    this.setMask(this.formatDigits(value));
  }

  private setMask(value: string, loadedValue: boolean = false): void {
    let thousand!: string;
    let decimal!: string;
    let formated!: string;

    if (value && loadedValue) {
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

    this.ngControl.control?.setValue(
      this.currencyBrPipe.transform(formated ? formated : value, true),
      { emitEvent: false }
    );
  }

  private formatDigits(value: string): string {
    if (value === 'R$ ') {
      return value;
    }

    const thousand = value.split(',')[0];
    let digits = value.split(',')[1];

    if (digits && digits.length === 2) {
      return value;
    }

    if (!thousand) {
      return '0,00';
    }

    if (!digits && digits !== '' && thousand) {
      value = `${value},00`;
    } else if (digits === '') {
      value = `${value}00`;
    } else if (digits && digits.length === 1) {
      value = `${value}0`;
    }

    return value;
  }

}
