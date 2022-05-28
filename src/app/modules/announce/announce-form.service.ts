import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ExceptionService } from '../../shared/exception/exception.service';
import { HttpPostService } from '../../shared/http/post/http-post.service';
import { AnnounceLead } from './announce-lead.interface';
import { LEAD_CONFIG } from '../lead/lead.config';

@Injectable({
  providedIn: 'root'
})
export class AnnounceFormService extends HttpPostService<AnnounceLead, void> {

  constructor(
    public override readonly httpClient: HttpClient,
    public override readonly exceptionService: ExceptionService
  ) {
    super(
      httpClient,
      exceptionService,
      LEAD_CONFIG.pathApiSingle
    );
  }

}
