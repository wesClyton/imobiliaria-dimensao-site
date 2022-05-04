import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ExceptionService } from '../../exception/exception.service';
import { HttpGetById } from './http-get-by-id.interface';

@Injectable({
  providedIn: 'root'
})
export class HttpGetByIdService<GetById> implements HttpGetById<GetById> {

  constructor(
    public readonly httpClient: HttpClient,
    public readonly exceptionService: ExceptionService,
    @Inject(String)
    public readonly endPoint: string
  ) { }

  public getById(id: string): Observable<GetById> {
    return this.httpClient
      .get<GetById>(`${this.endPoint}/${id}`)
      .pipe(
        catchError((error) => {
          this.exceptionService.handleError(error);
          return throwError(error);
        })
      );
  }

}
