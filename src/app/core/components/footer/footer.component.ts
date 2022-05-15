import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { finalize, take } from 'rxjs';
import { APP_CONFIG } from '../../../app.config';
import { Banner } from '../../../modules/banner/interfaces/banner.interface';
import { BannerGetAllService } from '../../../modules/banner/services/banner-get-all.service';
import { BROKER_CONFIG } from '../../../modules/broker/broker.config';
import { ModuleConfig } from '../../../shared/interfaces/module-config.interface';
import { LoadingService } from '../../loading/loading.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  public get APP_CONFIG(): ModuleConfig {
    return APP_CONFIG;
  }

  public get anoCorrente(): number {
    return new Date().getFullYear();
  }

  public banners!: Array<Banner>;

  public get BROKER_CONFIG(): ModuleConfig {
    return BROKER_CONFIG;
  }

  constructor(
    private readonly router: Router,
    private readonly bannerGetAllService: BannerGetAllService,
    private readonly loadingService: LoadingService
  ) { }

  ngOnInit(): void {
    this.getBanners();
  }

  private getBanners(): void {
    this.bannerGetAllService.queryFilterAdd({
      field: 'ativo',
      value: true
    });
    this.bannerGetAllService
      .getAll()
      .pipe(
        take(1),
        finalize(() => this.loadingService.hide())
      )
      .subscribe(banners => {
        this.bannerGetAllService.updateList(banners);
        this.banners = banners.data;
      });
  }

}
