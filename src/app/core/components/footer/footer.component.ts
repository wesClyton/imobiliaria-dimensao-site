import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';
import { APP_CONFIG } from '../../../app.config';
import { Banner } from '../../../modules/banner/interfaces/banner.interface';
import { BannerGetAllService } from '../../../modules/banner/services/banner.service';
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

  constructor(
    private readonly router: Router,
    private readonly bannerGetAllService: BannerGetAllService,
    private readonly loadingService: LoadingService
  ) { }

  ngOnInit(): void {
    this.getBanners();
  }

  private getBanners(): void {
    this.bannerGetAllService
      .getAll()
      .pipe(
        finalize(() => this.loadingService.hide())
      )
      .subscribe(banners => {
        this.bannerGetAllService.updateList(banners);
        this.banners = banners.data;
      });
  }

  public navigateHome(): void {
    this.router.navigateByUrl(APP_CONFIG.pathFront);
  }

  public navigateCorreaFavarao(): void {
    this.router.navigateByUrl(APP_CONFIG.pathFront);
  }

  public navigateTerms(): void {
    this.router.navigateByUrl(APP_CONFIG.pathFront);
  }

  public navigatePolicy(): void {
    this.router.navigateByUrl(APP_CONFIG.pathFront);
  }
}
