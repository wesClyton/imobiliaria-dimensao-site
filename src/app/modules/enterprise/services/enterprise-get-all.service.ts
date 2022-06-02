import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ExceptionService } from '../../../shared/exception/exception.service';
import { HttpGetAllService } from '../../../shared/http/get-all/http-get-all.service';
import { ENTERPRISE_CONFIG } from '../enterprise.config';
import { EnterpriseGetAll } from '../interfaces/enterprise-get-all.interface';

@Injectable({
  providedIn: 'root'
})
export class EnterpriseGetAllService extends HttpGetAllService<EnterpriseGetAll> {

  constructor(
    public override readonly httpClient: HttpClient,
    public override readonly exceptionService: ExceptionService
  ) {
    super(
      httpClient,
      exceptionService,
      ENTERPRISE_CONFIG.pathApiPlural
    )
  }

}
