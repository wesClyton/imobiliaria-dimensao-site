import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ExceptionService } from '../../../shared/exception/exception.service';
import { HttpGetAllService } from '../../../shared/http/get-all/http-get-all.service';
import { BROKER_CONFIG } from '../broker.config';
import { BrokerGetAll } from '../interfaces/broker-get-all.interface';

@Injectable({
  providedIn: 'root'
})
export class BrokerGetAllService extends HttpGetAllService<BrokerGetAll> {

  constructor(
    public override readonly httpClient: HttpClient,
    public override readonly exceptionService: ExceptionService
  ) {
    super(
      httpClient,
      exceptionService,
      BROKER_CONFIG.pathApiPlural
    )
  }

}
