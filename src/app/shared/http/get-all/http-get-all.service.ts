import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { ExceptionService } from '../../exception/exception.service';
import { QueryFilter } from '../query-filter/query-filter';
import { QueryFilterParam } from '../query-filter/query-filter.interface';
import { HttpGetAll } from './http-get-all.interface';

@Injectable({
  providedIn: 'root'
})
export class HttpGetAllService<GetAll> implements HttpGetAll<GetAll> {

  private queryFilter = '';

  constructor(
    public readonly httpClient: HttpClient,
    public readonly exceptionService: ExceptionService,
    @Inject(String)
    public readonly endPoint: string
  ) { }

  public getAll(): Observable<GetAll> {
    return this.httpClient
    .get<GetAll>(`${this.endPoint}${this.queryFilter}`)
      .pipe(
        catchError((error) => {
          this.exceptionService.handleError(error);
          return throwError(error);
        })
      );
  }

  public queryFilterAdd(query: QueryFilterParam | Array<QueryFilterParam>): void {
    this.queryFilter = QueryFilter.concat(query, this.queryFilter);
  }

  public queryFilterRemove(): void {
    this.queryFilter = '';
  }

}
