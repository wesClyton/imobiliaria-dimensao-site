import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router, UrlTree } from '@angular/router';
import { finalize, Subscription, take } from 'rxjs';
import { ScrollTopService } from 'src/app/shared/services/scroll-top/scroll-top.service';
import { LoadingService } from '../../../../core/loading/loading.service';
import { QueryFilter } from '../../../../shared/http/query-filter/query-filter';
import { QueryFilterParam } from '../../../../shared/http/query-filter/query-filter.interface';
import { MetaTagService } from '../../../../shared/services/meta-tag/meta-tag.service';
import { StringUtil } from '../../../../shared/utils/string.util';
import { ANNOUNCEMENT_CONFIG } from '../../announcement.config';
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

  public get title(): string {
    return 'Encontre seu imóvel';
  }

  constructor(
    private readonly announcementGetAllService: AnnouncementGetAllService,
    private readonly loadingService: LoadingService,
    private readonly activatedRoute: ActivatedRoute,
    private readonly scrollTopService: ScrollTopService,
    private readonly router: Router,
    private readonly metaTagService: MetaTagService
  ) {
    this.loadingService.show();
  }

  ngOnInit(): void {
    this.metaTagService.update({
      title: this.title
    });

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
    const queryParamsCurrent = (this.router['currentUrlTree'] as UrlTree).queryParams;
    let queryParams: Params | null | undefined = {};

    if (queryParamsCurrent) {
      Object.keys(queryParamsCurrent).forEach(key => {
        let value = StringUtil.prepareSearchValue(key, queryParamsCurrent[key]);

        if (QueryFilter.canAddQueryFilterWithValue(value)) {
          queryParams = { ...queryParams, [key]: value }
        }
      });
    }

    queryParams = { ...queryParams, page };

    const elementToScroll = document.getElementById('lengthResult');
    if (elementToScroll) {
      this.scrollTopService.scrollTop(elementToScroll);
    }

    this.router.navigate([ANNOUNCEMENT_CONFIG.pathFront], { queryParams });
  }

  public clickPrevious(currentPage: number): void {
    this.goPage(currentPage - 1);
  }

  public clickNext(currentPage: number): void {
    this.goPage(currentPage + 1);
  }

}
