import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ExceptionService } from '../../../shared/exception/exception.service';
import { HttpGetAllService } from '../../../shared/http/get-all/http-get-all.service';
import { DISTRICT_CONFIG } from '../district.config';
import { DistrictGetAll } from '../interfaces/district-get-all.interface';

@Injectable({
  providedIn: 'root'
})
export class DistrictGetAllService extends HttpGetAllService<DistrictGetAll> {

  constructor(
    public override readonly httpClient: HttpClient,
    public override readonly exceptionService: ExceptionService
  ) {
    super(
      httpClient,
      exceptionService,
      DISTRICT_CONFIG.pathApiPlural
    )
  }

}
