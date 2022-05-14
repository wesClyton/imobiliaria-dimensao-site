import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize, take } from 'rxjs';
import { LoadingService } from '../../../../core/loading/loading.service';
import { Announcement } from '../../interfaces/announcement.interface';
import { AnnouncementGetAllService } from '../../services/announcement-get-all.service';
import { AnnouncementGetByIdService } from '../../services/announcement-get-by-id.service';

@Component({
  selector: 'app-announcement-detail',
  templateUrl: 'announcement-detail.component.html',
  styleUrls: ['announcement-detail.component.scss']
})
export class AnnouncementDetailComponent implements OnInit {

  public announcement!: Announcement;

  private announcementId!: string;

  public announcements!: Array<Announcement>;

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly router: Router,
    private readonly announcementGetByIdService: AnnouncementGetByIdService,
    private readonly announcementGetAllService: AnnouncementGetAllService,
    private readonly loadingService: LoadingService
  ) {
    const state: { [k: string]: Announcement } | undefined = this.router.getCurrentNavigation()?.extras?.state;
    if (state && state['announcement']) {
      this.announcement = state['announcement'];
    }
    if (!this.announcement) {
      this.loadingService.show();
    }
  }

  ngOnInit(): void {
    if (this.announcement) {
      return;
    }
    this.announcementId = this.activatedRoute.snapshot.params['id'];
    this.getAnnouncement();
    this.getAnnouncements();
  }

  private getAnnouncement(): void {
    this.announcementGetByIdService
      .getById(this.announcementId)
      .pipe(
        take(1),
        finalize(() => this.loadingService.hide())
      )
      .subscribe(announcement => this.announcement = announcement);
  }

  private getAnnouncements(): void {
    this.announcementGetAllService
      .getAll()
      .pipe(
        take(1)
      )
      .subscribe(announcements => this.announcements = announcements.data.filter((announcement, index) => index < 3));
  }

}
