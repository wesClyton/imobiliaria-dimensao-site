import { Component, OnInit } from '@angular/core';
import { MetaTagService } from '../../shared/services/meta-tag/meta-tag.service';

@Component({
  selector: 'app-terms-of-use',
  templateUrl: 'terms-of-use.component.html',
  styleUrls: ['terms-of-use.component.scss']
})
export class TermsOfUseComponent implements OnInit {

  public get title(): string {
    return 'Termos de uso';
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
