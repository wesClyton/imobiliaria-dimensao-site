import { AfterViewInit, Component, ElementRef, OnDestroy, QueryList, ViewChildren } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { environment } from '../../../../environments/environment';
import { APP_CONFIG } from '../../../app.config';
import { ANNOUNCEMENT_CONFIG } from '../../../modules/announcement/announcement.config';
import { Banner } from '../../../modules/banner/interfaces/banner.interface';
import { BannerGetAllService } from '../../../modules/banner/services/banner-get-all.service';
import { BROKER_CONFIG } from '../../../modules/broker/broker.config';
import { ENTERPRISE_CONFIG } from '../../../modules/enterprise/enterprise.config';
import { ModuleConfig } from '../../../shared/interfaces/module-config.interface';
import { StringUtil } from '../../../shared/utils/string.util';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements AfterViewInit, OnDestroy {

  public menuActive = false;

  public subMenuActive = false;

  public get APP_CONFIG(): ModuleConfig {
    return APP_CONFIG;
  }

  public get ANNOUNCEMENT_CONFIG(): ModuleConfig {
    return ANNOUNCEMENT_CONFIG;
  }

  public get ENTERPRISE_CONFIG(): ModuleConfig {
    return ENTERPRISE_CONFIG;
  }

  public get BROKER_CONFIG(): ModuleConfig {
    return BROKER_CONFIG;
  }

  public get isHome(): boolean {
    return window.location.pathname === environment.baseUrl;
  }

  public banners!: Array<Banner>;

  @ViewChildren('linkFilter')
  public linksFilter!: QueryList<ElementRef>;

  private subscription = new Subscription();

  public get StringUtil(): typeof StringUtil {
    return StringUtil;
  }

  constructor(
    private readonly router: Router,
    private readonly bannerGetAllService: BannerGetAllService
  ) {
    this.subscription.add(
      this.router.events.subscribe((event: any) => {
        if (event instanceof NavigationEnd) {
          this.hideMenus();
        }
      })
    );
  }

  ngAfterViewInit(): void {
    this.banners = this.bannerGetAllService.items;
    if (!this.banners) {
      this.subscription.add(this.bannerGetAllService.banners$.subscribe((banners) => this.banners = banners.data));
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  public navigateFilter(banner: Banner): void {
    window.open(banner.link, '_blank');
    this.showMenu();
  }

  public showMenu(): void {
    this.menuActive = !this.menuActive;
    if (!this.menuActive) {
      this.subMenuActive = false;
    }
  }

  public showSubMenu(event: Event): void {
    event.preventDefault();
    this.subMenuActive = !this.subMenuActive;
  }

  private hideMenus(): void {
    this.menuActive = false;
    this.subMenuActive = false;
  }

  public navigateMapa(): void {
    this.hideMenus();
    this.router.navigateByUrl(`${APP_CONFIG.pathFront}/onde-encontrar`);
  }

}
