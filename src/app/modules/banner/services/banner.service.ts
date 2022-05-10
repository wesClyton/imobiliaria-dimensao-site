import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { ExceptionService } from '../../../shared/exception/exception.service';
import { HttpGetAllService } from '../../../shared/http/get-all/http-get-all.service';
import { BANNER_CONFIG } from '../banner.config';
import { BannerGetAll } from '../interfaces/banner-get-all.interface';
import { Banner } from '../interfaces/banner.interface';

@Injectable({
  providedIn: 'root'
})
export class BannerGetAllService extends HttpGetAllService<BannerGetAll> {

  private readonly bannersBS = new Subject<BannerGetAll>();

  public readonly banners$ = this.bannersBS.asObservable();

  public items!: Array<Banner>;

  constructor(
    public override readonly httpClient: HttpClient,
    public override readonly exceptionService: ExceptionService
  ) {
    super(
      httpClient,
      exceptionService,
      BANNER_CONFIG.pathApiPlural
    )
  }

  public updateList(banners: BannerGetAll): void {
    this.items = banners.data;
    this.bannersBS.next(banners);
  }

}
