import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, take } from 'rxjs/operators';
import { LoadingService } from '../../../core/loading/loading.service';
import { BrokerGetAll } from '../interfaces/broker-get-all.interface';
import { BrokerGetAllService } from '../services/broker-get-all.service';

@Injectable({
  providedIn: 'root'
})
export class BrokerGetAllResolver implements Resolve<BrokerGetAll> {

  constructor(
    private readonly loadingService: LoadingService,
    private readonly brokerGetAllService: BrokerGetAllService
  ) { }

  public resolve(): Observable<BrokerGetAll> {
    this.loadingService.show();
    this.brokerGetAllService.queryFilterRemove();
    this.brokerGetAllService.queryFilterAdd({
      field: 'ativo',
      value: true
    });
    return this.brokerGetAllService
      .getAll()
      .pipe(
        take(1),
        finalize(() => this.loadingService.hide())
      );
  }

}
