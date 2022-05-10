import { Directive, ElementRef, OnDestroy, OnInit } from '@angular/core';
import { NgControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { CurrencyBrPipe } from '../../pipes/currency-br/currency-br.pipe';
import { StringUtil } from '../../utils/string.util';

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
    this.setMask((this.elementRef.nativeElement as HTMLInputElement).value);
    this.subscription.add(this.ngControl.control?.valueChanges.subscribe(value => this.setMask(value)));
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  private setMask(value: string): void {
    this.ngControl.control?.setValue(
      this.currencyBrPipe.transform(StringUtil.removeSymbolCurrencyBr(value).toString()),
      { emitEvent: false }
    );
  }

}
