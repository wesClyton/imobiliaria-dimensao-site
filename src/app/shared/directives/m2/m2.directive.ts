import { Directive, ElementRef, OnDestroy, OnInit } from '@angular/core';
import { NgControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { M2Pipe } from '../../pipes/m2/m2.pipe';

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
    this.setMask((this.elementRef.nativeElement as HTMLInputElement).value);
    this.subscription.add(this.ngControl.control?.valueChanges.subscribe(value => this.setMask(value)));
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  private setMask(value: string): void {
    this.ngControl.control?.setValue(this.m2Pipe.transform(value), { emitEvent: false });
  }

}
