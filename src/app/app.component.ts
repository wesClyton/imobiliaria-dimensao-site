import { Component, OnInit } from '@angular/core';
import { ScrollTopService } from './shared/services/scroll-top/scroll-top.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(
    private readonly scrollTopService: ScrollTopService
  ) { }

  ngOnInit(): void {
    setTimeout(() => this.scrollTopService.scrollTop(), 200);
  }

}
