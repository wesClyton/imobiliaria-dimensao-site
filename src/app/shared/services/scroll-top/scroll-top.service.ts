import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ScrollTopService {

  constructor(@Inject(PLATFORM_ID) private readonly platformId: Object) { }

  public scrollTop(element?: HTMLElement | undefined): void {
    if (!isPlatformBrowser(this.platformId)) return;
    if (!element) {
      element = document.getElementById('main-header') || undefined;
    }
    if (element) {
      // setTimeout por causa do Firefox
      setTimeout(() => {
        const options: ScrollIntoViewOptions = {
          behavior: 'smooth'
        };
        if (element) {
          element.scrollIntoView(options);
        }
      });
    }
  }

  public scrollTopByValue(value: number = 0): void {
    if (!isPlatformBrowser(this.platformId)) return;
    window.scrollTo({top: value, behavior: 'smooth'});
  }

}
