import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ExceptionService } from '../../../shared/exception/exception.service';
import { HttpGetAllService } from '../../../shared/http/get-all/http-get-all.service';
import { CITY_CONFIG } from '../city.config';
import { CityGetAll } from '../interfaces/city-get-all.interface';

@Injectable({
  providedIn: 'root'
})
export class CityGetAllService extends HttpGetAllService<CityGetAll> {

  constructor(
    public override readonly httpClient: HttpClient,
    public override readonly exceptionService: ExceptionService
  ) {
    super(
      httpClient,
      exceptionService,
      CITY_CONFIG.pathApiPlural
    )
  }

}
