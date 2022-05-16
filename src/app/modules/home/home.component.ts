import { Component, ElementRef, OnDestroy, OnInit, QueryList, Renderer2, ViewChildren, ViewEncapsulation } from '@angular/core';
import { Subscription } from 'rxjs';
import SwiperCore, { Mousewheel, Pagination, SwiperOptions } from 'swiper';
import { PathImagePipe } from '../../shared/pipes/path-image/path-image.pipe';
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

  public pathImageBanner(foto: string): string {
    return this.pathImagePipe.transform(foto, 'banners');
  }

  public buttonsAnimation(): void {
    this.buttonsDiv?.forEach(element => this.renderer.addClass(element.nativeElement, 'inactive'));
    setTimeout(() => this.buttonsDiv?.forEach(element => this.renderer.removeClass(element.nativeElement, 'inactive')), 400);
  }

}
