import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-announcement-detail',
  templateUrl: 'announcement-detail.component.html'
})
export class AnnouncementDetailComponent implements OnInit {

  constructor(
    private readonly activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    console.log('route', this.activatedRoute)
  }

}
