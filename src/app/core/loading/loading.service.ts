import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  private readonly loadingBS = new BehaviorSubject<boolean>(false);

  public readonly observer$ = this.loadingBS.asObservable();

  constructor() { }

  public show(): void {
    this.loadingBS.next(true);
  }

  public hide(): void {
    this.loadingBS.next(false);
  }

}
