import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { LoadingService } from './core/loading/loading.service';
import { ScrollTopService } from './shared/services/scroll-top/scroll-top.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

  private subscription = new Subscription();

  public showLoading!: boolean;

  constructor(
    private readonly router: Router,
    private readonly scrollTopService: ScrollTopService,
    private readonly loadingService: LoadingService
  ) { }

  ngOnInit(): void {
    this.subscription.add(this.loadingService.observer$.subscribe(value => this.showLoading = value));

    this.subscription.add(
      this.router.events.subscribe((event: any) => {
        if (event instanceof NavigationStart && !event.url.includes('&page=')) {
          setTimeout(() => this.scrollTopService.scrollTop(), 200);
        }
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
