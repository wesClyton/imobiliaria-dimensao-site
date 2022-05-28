import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ExceptionService } from '../../shared/exception/exception.service';
import { HttpPostService } from '../../shared/http/post/http-post.service';
import { LEAD_CONFIG } from '../lead/lead.config';
import { ContactLead } from './contact-lead.interface';

@Injectable({
  providedIn: 'root'
})
export class ContactFormService extends HttpPostService<ContactLead, void> {

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
