import { Component, OnInit } from '@angular/core';
import { MetaTagService } from '../../shared/services/meta-tag/meta-tag.service';

@Component({
  selector: 'app-about',
  templateUrl: 'about.component.html',
  styleUrls: ['about.component.scss']
})
export class AboutComponent implements OnInit {

  constructor(
    private readonly metaTagService: MetaTagService
  ) { }

  ngOnInit(): void {
    this.metaTagService.update({
      title: 'Quem somos'
    });
  }

}
