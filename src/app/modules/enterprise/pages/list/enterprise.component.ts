import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MetaTagService } from '../../../../shared/services/meta-tag/meta-tag.service';
import { ENTERPRISE_CONFIG } from '../../enterprise.config';
import { EnterpriseGetAll } from '../../interfaces/enterprise-get-all.interface';
import { Enterprise } from '../../interfaces/enterprise.interface';

@Component({
  selector: 'app-enterprise',
  templateUrl: 'enterprise.component.html',
  styleUrls: ['enterprise.component.scss']
})
export class EnterpriseComponent implements OnInit {

  public enterprises!: Array<Enterprise>;;

  public enterprise!: Enterprise | null;

  public get title(): string {
    return ENTERPRISE_CONFIG.namePlural;
  }

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly metaTagService: MetaTagService
  ) { }

  ngOnInit(): void {
    this.metaTagService.update({
      title: this.title
    });

    this.enterprises = (this.activatedRoute.snapshot.data['enterpriseGetAll'] as EnterpriseGetAll).data;
  }

  public openLink(enterprise: Enterprise): void {
    window.open(`${enterprise.link}`, '_blank')
  }

}
