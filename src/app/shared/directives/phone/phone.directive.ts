import { Directive, ElementRef, OnDestroy, OnInit } from '@angular/core';
import { NgControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { PhonePipe } from '../../pipes/phone/phone.pipe';
import { StringUtil } from '../../utils/string.util';

@Directive({
  selector: '[appPhone]',
  providers: [PhonePipe]
})
export class PhoneDirective implements OnInit, OnDestroy {

  private subscription = new Subscription();

  constructor(
    private readonly phonePipe: PhonePipe,
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
    this.ngControl.control?.setValue(this.phonePipe.transform(StringUtil.onlyNumbers(value)), { emitEvent: false });
  }

}
