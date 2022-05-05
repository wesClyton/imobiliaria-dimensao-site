import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ScrollTopService } from './shared/services/scroll-top/scroll-top.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

  private subs = new Subscription();

  constructor(
    private readonly router: Router,
    private readonly scrollTopService: ScrollTopService
  ) { }

  ngOnInit(): void {
    this.subs.add(
      this.router.events.subscribe((event: any) => {
        if (event instanceof NavigationStart) {
          setTimeout(() => this.scrollTopService.scrollTop(), 200);
        }
      })
    );
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }


}
