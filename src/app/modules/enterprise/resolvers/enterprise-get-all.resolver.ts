import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, take } from 'rxjs/operators';
import { LoadingService } from '../../../core/loading/loading.service';
import { EnterpriseGetAll } from '../interfaces/enterprise-get-all.interface';
import { EnterpriseGetAllService } from '../services/enterprise-get-all.service';

@Injectable({
  providedIn: 'root'
})
export class EnterpriseGetAllResolver implements Resolve<EnterpriseGetAll> {

  constructor(
    private readonly loadingService: LoadingService,
    private readonly enterpriseGetAllService: EnterpriseGetAllService
  ) { }

  public resolve(): Observable<EnterpriseGetAll> {
    this.loadingService.show();
    this.enterpriseGetAllService.queryFilterRemove();
    this.enterpriseGetAllService.queryFilterAdd({
      field: 'ativo',
      value: true
    });
    return this.enterpriseGetAllService
      .getAll()
      .pipe(
        take(1),
        finalize(() => this.loadingService.hide())
      );
  }

}
