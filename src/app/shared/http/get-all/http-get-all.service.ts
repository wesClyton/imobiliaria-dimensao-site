import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { ExceptionService } from '../../exception/exception.service';
import { HttpGetAll } from './http-get-all.interface';

@Injectable({
  providedIn: 'root'
})
export class HttpGetAllService<GetAll> implements HttpGetAll<GetAll> {

  constructor(
    public readonly httpClient: HttpClient,
    public readonly exceptionService: ExceptionService,
    @Inject(String)
    public readonly endPoint: string
  ) { }

  public getAll(): Observable<GetAll> {
    return this.httpClient
      .get<GetAll>(this.endPoint)
      .pipe(
        catchError((error) => {
          this.exceptionService.handleError(error);
          return throwError(error);
        })
      );
  }

}
