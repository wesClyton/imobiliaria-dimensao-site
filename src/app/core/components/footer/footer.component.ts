import { AfterViewInit, Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { APP_CONFIG } from '../../../app.config';
import { ANNOUNCEMENT_CONFIG } from '../../../modules/announcement/announcement.config';
import { AnnouncementLinkUtil } from '../../../modules/announcement/utils/announcement-link.util';
import { Banner } from '../../../modules/banner/interfaces/banner.interface';
import { BannerGetAllService } from '../../../modules/banner/services/banner-get-all.service';
import { BROKER_CONFIG } from '../../../modules/broker/broker.config';
import { ModuleConfig } from '../../../shared/interfaces/module-config.interface';
import { StringUtil } from '../../../shared/utils/string.util';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements AfterViewInit, OnDestroy {

  public get APP_CONFIG(): ModuleConfig {
    return APP_CONFIG;
  }

  public get currentYear(): number {
    return new Date().getFullYear();
  }

  public banners!: Array<Banner>;

  public get BROKER_CONFIG(): ModuleConfig {
    return BROKER_CONFIG;
  }

  public get StringUtil(): typeof StringUtil {
    return StringUtil;
  }

  public get ANNOUNCEMENT_CONFIG(): ModuleConfig {
    return ANNOUNCEMENT_CONFIG;
  }

  public get AnnouncementLinkUtil(): typeof AnnouncementLinkUtil {
    return AnnouncementLinkUtil;
  }

  private subscription = new Subscription();

  constructor(
    private readonly bannerGetAllService: BannerGetAllService
  ) { }


  ngAfterViewInit(): void {
    this.banners = this.bannerGetAllService.items;
    if (!this.banners) {
      this.subscription.add(this.bannerGetAllService.banners$.subscribe((banners) => this.banners = banners.data));
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
