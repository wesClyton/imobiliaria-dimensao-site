import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ExceptionService } from '../../../shared/exception/exception.service';
import { HttpGetAllService } from '../../../shared/http/get-all/http-get-all.service';
import { ANNOUNCEMENT_CONFIG } from '../announcement.config';
import { AnnouncementGetAll } from '../interfaces/announcement-get-all.interface';

@Injectable({
  providedIn: 'root'
})
export class AnnouncementGetAllService extends HttpGetAllService<AnnouncementGetAll> {

  constructor(
    public override readonly httpClient: HttpClient,
    public override readonly exceptionService: ExceptionService
  ) {
    super(
      httpClient,
      exceptionService,
      ANNOUNCEMENT_CONFIG.pathApiPlural
    )
  }

}
