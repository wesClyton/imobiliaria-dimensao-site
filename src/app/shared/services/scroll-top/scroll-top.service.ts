import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ScrollTopService {

  constructor() { }

  public scrollTop(element?: HTMLElement | undefined): void {
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
    window.scrollTo({top: value, behavior: 'smooth'});
  }

}
