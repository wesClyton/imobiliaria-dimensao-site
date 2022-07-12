import { Component, ElementRef, OnDestroy, OnInit, QueryList, Renderer2, ViewChild, ViewChildren, ViewEncapsulation } from '@angular/core';
import { Subscription } from 'rxjs';
import { StringUtil } from 'src/app/shared/utils/string.util';
import SwiperCore, { Mousewheel, Pagination, SwiperOptions } from 'swiper';
import { SwiperComponent, SwiperSlideDirective } from 'swiper/angular';
import { ModuleConfig } from '../../shared/interfaces/module-config.interface';
import { PathImagePipe } from '../../shared/pipes/path-image/path-image.pipe';
import { ScrollTopService } from '../../shared/services/scroll-top/scroll-top.service';
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

  public get ANNOUNCEMENT_CONFIG(): ModuleConfig {
    return ANNOUNCEMENT_CONFIG;
  }

  public get AnnouncementLinkUtil(): typeof AnnouncementLinkUtil {
    return AnnouncementLinkUtil;
  }

  private scroledToFooter = false;

  private inLastBanner = false;

  private get canScrollToFooter(): boolean {
    return this.inLastBanner && !this.scroledToFooter;
  }

  constructor(
    private readonly bannerGetAllService: BannerGetAllService,
    private readonly pathImagePipe: PathImagePipe,
    private readonly renderer: Renderer2,
    private readonly scrollTopService: ScrollTopService
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
    return swipers.some(swiper => swiper.slideIndex === (this.banners.length - 1) && swiper.slideData.isActive);
  }

  public pathImageBanner(foto: string): string {
    return this.pathImagePipe.transform(foto, 'banners');
  }

  public transitionStart(): void {
    this.buttonsDiv?.forEach(element => this.renderer.addClass(element.nativeElement, 'inactive'));
    setTimeout(() => this.buttonsDiv?.forEach(element => this.renderer.removeClass(element.nativeElement, 'inactive')), 400);
  }

  public get StringUtil(): typeof StringUtil {
    return StringUtil;
  }

  public transitionEnd(): void {
    return;
    this.subscription.add(
      this.swiper?.activeSlides
        .subscribe(swipers => {
          this.inLastBanner = this.checkLastBanner(swipers);
          if (this.inLastBanner && !this.scroledToFooter) {
            this.addEventListener();
          } else {
            document.removeEventListener('wheel', () => {}, false);
          }
        })
    );
  }

  private addEventListener(): void {
    document.addEventListener('wheel', (event: WheelEvent) => {
      const delta = Math.sign(event.deltaY);
      if (delta > 0 && this.canScrollToFooter) {
        setTimeout(() => {
          this.scrollFooter();
        }, 1100);
      } else {
        this.scroledToFooter = false;
      }
    });
  }

  private scrollFooter(): void {
    const footer = document.getElementById('main-footer');
    if (footer && this.canScrollToFooter) {
      this.scrollTopService.scrollTop(footer);
    }
    this.scroledToFooter = true;
  }

}

// Olá, gostaria de mais informações sobre o imóvel DC66. https://imobiliariadimensao.com.br/anuncios/casa-a-venda-no-condominio-portal-das-aguas-em-umuarama-pr/DC66
