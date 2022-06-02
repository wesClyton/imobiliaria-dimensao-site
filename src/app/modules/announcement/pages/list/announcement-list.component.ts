import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { finalize, Subscription, take } from 'rxjs';
import { ScrollTopService } from 'src/app/shared/services/scroll-top/scroll-top.service';
import { LoadingService } from '../../../../core/loading/loading.service';
import { QueryFilterParam } from '../../../../shared/http/query-filter/query-filter.interface';
import { AnnouncementType } from '../../enums/announcement-type.enum';
import { AnnouncementGetAll } from '../../interfaces/announcement-get-all.interface';
import { AnnouncementGetAllService } from '../../services/announcement-get-all.service';

@Component({
  selector: 'app-announcement-list',
  templateUrl: 'announcement-list.component.html',
  styleUrls: ['announcement-list.component.scss']
})
export class AnnouncementListComponent implements OnInit, OnDestroy {

  public announcementGetAll!: AnnouncementGetAll;

  private subscription = new Subscription();

  public quantityItemsPerPage = 12;

  public pages = new Array<number>();

  constructor(
    private readonly announcementGetAllService: AnnouncementGetAllService,
    private readonly loadingService: LoadingService,
    private readonly activatedRoute: ActivatedRoute,
    private readonly scrollTopService: ScrollTopService,
  ) {
    this.loadingService.show();
  }

  ngOnInit(): void {
    this.subscription.add(
      this.activatedRoute.queryParams.subscribe(filter => {
        Object.keys(filter).length ? this.getAnouncementsByFilter(filter) : this.getAnnouncementByRouteType();
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  private getAnouncementsByFilter(filter: any): void {
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

  private getAnnouncementByRouteType(): void {
    const type: AnnouncementType = this.activatedRoute.snapshot.params['type'];
    this.getAnnouncements(null, type);
  }

  private getAnnouncements(queryFilter?: Array<QueryFilterParam> | QueryFilterParam | null, type?: AnnouncementType): void {
    this.announcementGetAllService.queryFilterRemove();

    this.announcementGetAllService.queryFilterAdd([
      {
        field: 'ativo',
        value: true
      },
      {
        field: 'take',
        value: this.quantityItemsPerPage
      }
    ]);

    if (queryFilter) {
      this.announcementGetAllService.queryFilterAdd(queryFilter);
    }

    if (type) {
      this.announcementGetAllService.queryFilterAdd({
        field: 'tipo',
        value: type
      });
    }

    this.announcementGetAllService
      .getAll()
      .pipe(
        take(1),
        finalize(() => this.loadingService.hide())
      )
      .subscribe(announcements => {
        this.announcementGetAll = announcements;
        this.createPaginator();
      });
  }

  private createPaginator(): void {
    this.pages = new Array<number>();
    const numberOfPages = (Math.ceil(this.announcementGetAll.count / this.quantityItemsPerPage));
    for (let i = 0; i <= (numberOfPages - 1); i++) {
      this.pages.push(i);
    }
  }

  public goPage(page: number): void {
    let queryFilter: QueryFilterParam;

    queryFilter = {
      field: 'page',
      value: page
    }

    this.getAnnouncements(queryFilter);
    this.scrollTopService.scrollTop(document.getElementsByTagName('h6')[0]);
  }

  public clickPrevious(currentPage: number): void {
    this.goPage(currentPage - 1);
  }

  public clickNext(currentPage: number): void {
    this.goPage(currentPage + 1);
  }


}
