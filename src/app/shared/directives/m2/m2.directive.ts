import { Directive, ElementRef, HostListener, OnDestroy, OnInit } from '@angular/core';
import { NgControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { M2Pipe } from '../../pipes/m2/m2.pipe';
import { StringUtil } from '../../utils/string.util';

@Directive({
  selector: '[appM2]',
  providers: [M2Pipe]
})
export class M2Directive implements OnInit, OnDestroy {

  private subscription = new Subscription();

  constructor(
    private readonly m2Pipe: M2Pipe,
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
    let formated!: string;

    if (value && loadedValue) {
      formated = StringUtil.formatMaskDecimalInValueLoaded(value);
    }

    this.ngControl.control?.setValue(
      this.m2Pipe.transform(formated ? formated : value, true),
      { emitEvent: false }
    );
  }

  private formatDigits(value: string): string {
    if (!value) {
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
