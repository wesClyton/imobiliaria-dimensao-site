import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ExceptionService } from '../../exception/exception.service';
import { HttpPost } from './http-post.interface';

@Injectable({
  providedIn: 'root'
})
export class HttpPostService<PostIn, PostOut> implements HttpPost<PostIn, PostOut> {

  constructor(
    public readonly httpClient: HttpClient,
    public readonly exceptionService: ExceptionService,
    @Inject(String)
    public readonly endPoint: string
  ) { }

  public post(type: PostIn): Observable<PostOut> {
    return this.httpClient
      .post<PostOut>(this.endPoint, type)
      .pipe(
        catchError((error) => {
          this.exceptionService.handleError(error);
          return throwError(error);
        })
      );
  }

}
