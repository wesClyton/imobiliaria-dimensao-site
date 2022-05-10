import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-loading-component',
  template: `
  <div *ngIf="show" class="overlay">
    <mat-spinner></mat-spinner>
  </div>
  `,
  styles: [`
    .overlay {
      width: 100vw;
      height: 100vh;
      position: fixed;
      inset: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 1000;
      background-color: rgba(255, 255, 255, 0.75);
    }
  `]
})
export class LoadingComponent {

  @Input()
  public show = false;

  constructor() { }

}
