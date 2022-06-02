import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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

  constructor(
    private readonly activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.enterprises = (this.activatedRoute.snapshot.data['enterpriseGetAll'] as EnterpriseGetAll).data;
  }

  public openLink(enterprise: Enterprise): void {
    window.open(`${enterprise.link}`, '_blank')
  }

}
