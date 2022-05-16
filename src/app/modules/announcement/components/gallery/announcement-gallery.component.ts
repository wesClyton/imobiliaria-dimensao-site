import { Component, Input, ViewEncapsulation } from '@angular/core';
import SwiperCore, { Mousewheel, Navigation, SwiperOptions } from 'swiper';
import { NotificationService } from '../../../../core/notification/notification.service';
import { Announcement } from '../../interfaces/announcement.interface';
SwiperCore.use([Mousewheel, Navigation]);

@Component({
  selector: 'app-announcement-gallery',
  templateUrl: 'announcement-gallery.component.html',
  styleUrls: ['announcement-gallery.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AnnouncementGalleryComponent {

  @Input()
  public announcement!: Announcement;

  public isOpened = false;

  public swiperConfig: SwiperOptions = {
    autoplay: false,
    direction: 'horizontal',
    slidesPerView: 'auto',
    centeredSlides: true,
    spaceBetween: 2,
    initialSlide: 0,
    mousewheel: true,
    speed: 500,
    navigation: true,
    loop: true
  };

  public showPhotos = true;

  public showVideo = false;

  public showTour360 = false;

  public showMap = false;

  constructor(
    private readonly notificationService: NotificationService
  ) { }

  public show(): void {
    this.isOpened = true;
  }

  public hide(): void {
    this.isOpened = false;
  }

  private resetButtons(): void {
    this.showPhotos = false;
    this.showVideo = false;
    this.showTour360 = false;
    this.showMap = false;
  }

  public photosClick(): void {
    this.resetButtons();
    this.showPhotos = true;
  }

  public videosClick(): void {
    this.resetButtons();
    this.showVideo = true;
  }

  public tour360Click(): void {
    this.resetButtons();
    this.showTour360 = true;
  }

  public mapClick(): void {
    this.resetButtons();
    this.showMap = true;
  }

  public copyLink(): void {
    this.notificationService.success('Link copiado para área de transferência');
  }

}
