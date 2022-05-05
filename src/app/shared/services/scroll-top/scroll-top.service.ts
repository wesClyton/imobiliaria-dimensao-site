import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ScrollTopService {

  constructor() {}

  scrollTop(element?: HTMLElement | undefined): void {
    if (!element) {
      element = document.getElementsByTagName('main')[0] || undefined;
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

}
