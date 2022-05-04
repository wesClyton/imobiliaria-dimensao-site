import { HttpErrorResponse } from '@angular/common/http';
import { ErrorHandler, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationService } from '../../core/notification/notification.service';
import { PAGES_CONFIG } from '../../pages/page.config';
import { TypeORMError } from '../enums/type-orm-error.enum';
import { ApiError } from '../interfaces/api-error.interface';
import { HttpStatusCode } from '../interfaces/http-status-code.enum';

@Injectable({
  providedIn: 'root'
})
export class ExceptionService implements ErrorHandler {

  private get messageErrorUnknown(): string {
    return 'Ocorreu um erro desconhecido.';
  }

  private get messageSystemUnavailable(): string {
    return 'O sistema encontra-se indisponível.';
  }

  constructor(
    private readonly notificationService: NotificationService,
    private readonly router: Router
  ) { }

  handleError(response: any): void {
    if (response instanceof HttpErrorResponse) {
      if (response.status === HttpStatusCode.NotFound) {
        this.notificationService.error(`#${response.status} - Requisição não encontrada.`);
        return;
      }

      if (response.status === HttpStatusCode.InternalServerError) {
        this.router.navigate(
          [`${PAGES_CONFIG.pathFront}/erro`],
          { queryParams: { code: HttpStatusCode.InternalServerError }
        });
        return;
      }

      if (response.statusText === 'Unknown Error') {
        this.notificationService.error(this.messageErrorUnknown);
        return;
      }

      if (
        response.status === HttpStatusCode.Unauthorized ||
        response.statusText === 'Unauthorized' ||
        response.status === HttpStatusCode.Forbidden ||
        response.statusText === 'Forbidden') {
        this.router.navigate(
          [`${PAGES_CONFIG.pathFront}/erro`],
          { queryParams: { code: HttpStatusCode.Unauthorized }
        });
        return;
      }

      if (response.error && response) {
        (response.error as Array<ApiError>).forEach(erro => {
          Object.keys(erro.constraints).forEach(key => {
            this.notificationService.error(erro.constraints[key as TypeORMError] || this.messageErrorUnknown);
          });
        });
        return;
      }

      this.notificationService.error(this.messageSystemUnavailable);
    } else {
      this.notificationService.error(this.messageSystemUnavailable);
    }
  }

}
