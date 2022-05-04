import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ExceptionService } from '../../../shared/exception/exception.service';
import { HttpGetAllService } from '../../../shared/http/get-all/http-get-all.service';
import { BANNER_CONFIG } from '../banner.config';
import { BannerGetAll } from '../interfaces/banner-get-all.interface';

@Injectable({
  providedIn: 'root'
})
export class BannerGetAllService extends HttpGetAllService<BannerGetAll> {

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

}
