import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { finalize, Subscription, take } from 'rxjs';
import { LoadingService } from '../../../../core/loading/loading.service';
import { QueryFilterParam } from '../../../../shared/http/query-filter/query-filter.interface';
import { Announcement } from '../../interfaces/announcement.interface';
import { AnnouncementGetAllService } from '../../services/announcement-get-all.service';

@Component({
  selector: 'app-announcement-list',
  templateUrl: 'announcement-list.component.html',
  styleUrls: ['announcement-list.component.scss']
})
export class AnnouncementListComponent implements OnInit {

  public announcements!: Array<Announcement>;

  private subscription = new Subscription();

  constructor(
    private readonly announcementGetAllService: AnnouncementGetAllService,
    private readonly loadingService: LoadingService,
    private readonly activatedRoute: ActivatedRoute
  ) {
    this.loadingService.show();
  }

  ngOnInit(): void {
    this.getAnnouncements();

    this.subscription.add(
      this.activatedRoute.queryParams.subscribe(filter => {
        if (filter) {
          this.loadingService.show();
          let queryFilter = new Array<QueryFilterParam>();

          const fieldsParseNumber = ['valorMinimo', 'valorMaximo', 'areaMinima', 'areaMaxima', 'banheiros', 'dormitorios', 'vagasGaragem'];

          Object.keys(filter).forEach(field => {
            let value = filter[field];
            if (fieldsParseNumber.includes(field)) {
              value = parseFloat(value)
            }
            queryFilter.push({ field, value });
          });

          this.getAnnouncements(queryFilter);
        }
      })
    );
  }

  private getAnnouncements(queryFilter?: Array<QueryFilterParam>): void {
    this.announcementGetAllService.queryFilterRemove();

    this.announcementGetAllService.queryFilterAdd({
      field: 'ativo',
      value: true
    });

    if (queryFilter) {
      this.announcementGetAllService.queryFilterAdd(queryFilter);
    }
    this.announcementGetAllService
      .getAll()
      .pipe(
        take(1),
        finalize(() => this.loadingService.hide())
      )
      .subscribe(announcements => this.announcements = announcements.data)
  }

}
