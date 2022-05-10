import { Component } from '@angular/core';
import { Banner } from '../banner/interfaces/banner.interface';

@Component({
  selector: 'app-home',
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.scss']
})
export class HomeComponent {

  public banners!: Array<Banner>;

  constructor() { }

}
