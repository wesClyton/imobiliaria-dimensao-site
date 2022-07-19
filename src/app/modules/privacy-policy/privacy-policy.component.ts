import { Component, OnInit } from '@angular/core';
import { MetaTagService } from '../../shared/services/meta-tag/meta-tag.service';

@Component({
  selector: 'app-privacy-policy',
  templateUrl: 'privacy-policy.component.html',
  styleUrls: ['privacy-policy.component.scss']
})
export class PrivacyPolicyComponent implements OnInit {

  public get title(): string {
    return 'Política de privacidade';
  }

  constructor(
    private readonly metaTagService: MetaTagService
  ) { }

  ngOnInit(): void {
    this.metaTagService.update({
      title: this.title
    });
  }

}
