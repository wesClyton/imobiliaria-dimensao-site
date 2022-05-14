import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ExceptionService } from '../../../shared/exception/exception.service';
import { HttpGetByIdService } from '../../../shared/http/get-by-id/http-get-by-id.service';
import { ANNOUNCEMENT_CONFIG } from '../announcement.config';
import { Announcement } from '../interfaces/announcement.interface';

@Injectable({
  providedIn: 'root'
})
export class AnnouncementGetByIdService extends HttpGetByIdService<Announcement> {

  constructor(
    public override readonly httpClient: HttpClient,
    public override readonly exceptionService: ExceptionService
  ) {
    super(
      httpClient,
      exceptionService,
      ANNOUNCEMENT_CONFIG.pathApiSingle
    )
  }

}
