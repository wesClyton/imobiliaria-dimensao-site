import { Component, ElementRef, OnDestroy, OnInit, QueryList, Renderer2, ViewChild, ViewChildren, ViewEncapsulation } from '@angular/core';
import { Subscription } from 'rxjs';
import { StringUtil } from 'src/app/shared/utils/string.util';
import SwiperCore, { Mousewheel, Pagination, SwiperOptions } from 'swiper';
import { SwiperComponent, SwiperSlideDirective } from 'swiper/angular';
import { ModuleConfig } from '../../shared/interfaces/module-config.interface';
import { PathImagePipe } from '../../shared/pipes/path-image/path-image.pipe';
import { ANNOUNCEMENT_CONFIG } from '../announcement/announcement.config';
import { AnnouncementLinkUtil } from '../announcement/utils/announcement-link.util';
import { Banner } from '../banner/interfaces/banner.interface';
import { BannerGetAllService } from '../banner/services/banner-get-all.service';
SwiperCore.use([Mousewheel, Pagination]);

@Component({
  selector: 'app-home',
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.scss'],
  providers: [PathImagePipe],
  encapsulation: ViewEncapsulation.None
})
export class HomeComponent implements OnInit, OnDestroy {

  @ViewChild(SwiperComponent, { static: false })
  swiper!: SwiperComponent;

  public banners!: Array<Banner>;

  private subscription = new Subscription();

  public swiperConfig: SwiperOptions = {
    autoplay: false,
    direction: 'vertical',
    slidesPerView: 1,
    mousewheel: true,
    speed: 1000
  };

  @ViewChildren('buttons')
  public buttonsDiv!: QueryList<ElementRef>;

  @ViewChildren('bannerElement')
  public bannersElement!: QueryList<ElementRef>;

  public get ANNOUNCEMENT_CONFIG(): ModuleConfig {
    return ANNOUNCEMENT_CONFIG;
  }

  public get AnnouncementLinkUtil(): typeof AnnouncementLinkUtil {
    return AnnouncementLinkUtil;
  }

  constructor(
    private readonly bannerGetAllService: BannerGetAllService,
    private readonly pathImagePipe: PathImagePipe,
    private readonly renderer: Renderer2
  ) { }

  ngOnInit(): void {
    this.banners = this.bannerGetAllService.items;
    if (!this.banners) {
      this.subscription.add(this.bannerGetAllService.banners$.subscribe((banners) => this.banners = banners.data));
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  private checkLastBanner(swipers: Array<SwiperSlideDirective>): boolean {
    return swipers.some(swiper => swiper.slideIndex === (this.banners.length) && swiper.slideData.isActive);
  }

  public pathImageBanner(foto: string): string {
    return this.pathImagePipe.transform(foto, 'banners');
  }

  public transitionStart(): void {
    this.checkSlideFooter()
    this.buttonsDiv?.forEach(element => this.renderer.addClass(element.nativeElement, 'inactive'));
    setTimeout(() => this.buttonsDiv?.forEach(element => this.renderer.removeClass(element.nativeElement, 'inactive')), 400);
  }

  public get StringUtil(): typeof StringUtil {
    return StringUtil;
  }

  public get isDesktop(): boolean {
    return window?.outerWidth >= 767.98;
  }

  private checkSlideFooter(): void {
    const swiperWrapper: HTMLElement = document.getElementsByClassName('swiper-wrapper')[0] as any;
    const footer = document.getElementById('main-footer');
    const header = document.getElementById('main-header');

    this.subscription.add(
      this.swiper?.activeSlides
        .subscribe(swipers => {
          const styleY = (swiperWrapper.getAttribute('style') as string).split('transform: translate3d(0px, ')[1].split('px,')[0];

          if (this.checkLastBanner(swipers) && swiperWrapper && footer && header) {
            const newStyleY = (parseFloat(styleY) + (footer.clientHeight - header.clientHeight));
            swiperWrapper.style.transform = `translate3d(0px, ${newStyleY}px, 0px)`;
          } else {
            swiperWrapper.style.transform = `translate3d(0px, ${styleY}px, 0px)`;
          }
        })
    );
  }


}
