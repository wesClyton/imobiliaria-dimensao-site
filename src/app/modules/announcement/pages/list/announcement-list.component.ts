import { Component, OnInit } from '@angular/core';
import { finalize, take } from 'rxjs';
import { LoadingService } from '../../../../core/loading/loading.service';
import { Announcement } from '../../interfaces/announcement.interface';
import { AnnouncementGetAllService } from '../../services/announcement-get-all.service';

@Component({
  selector: 'app-announcement-list',
  templateUrl: 'announcement-list.component.html',
  styleUrls: ['announcement-list.component.scss']
})
export class AnnouncementListComponent implements OnInit {

  public announcements!: Array<Announcement>;

  constructor(
    private readonly announcementGetAllService: AnnouncementGetAllService,
    private readonly loadingService: LoadingService
  ) {
    this.loadingService.show();
  }

  ngOnInit(): void {
    this.getAnnouncements();
  }

  private getAnnouncements(): void {
    this.announcementGetAllService
      .getAll()
      .pipe(
        take(1),
        finalize(() => this.loadingService.hide())
      )
      .subscribe(announcements => this.announcements = announcements.data)
  }

}
