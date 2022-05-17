import { Component, Input, OnChanges, OnInit, SimpleChanges, ViewEncapsulation } from '@angular/core';
import SwiperCore, { Mousewheel, Navigation, SwiperOptions } from 'swiper';
import { NotificationService } from '../../../../core/notification/notification.service';
import { AnnouncementPhoto } from '../../interfaces/announcement-photo.interface';
import { Announcement } from '../../interfaces/announcement.interface';
SwiperCore.use([Mousewheel, Navigation]);

@Component({
  selector: 'app-announcement-gallery',
  templateUrl: 'announcement-gallery.component.html',
  styleUrls: ['announcement-gallery.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AnnouncementGalleryComponent implements OnInit, OnChanges {

  @Input()
  public announcement!: Announcement;

  public isOpened = false;

  public swiperConfig: SwiperOptions = {
    autoplay: false,
    direction: 'horizontal',
    slidesPerView: 'auto',
    spaceBetween: 2,
    initialSlide: 0,
    mousewheel: true,
    speed: 500,
    navigation: true,
    loop: false
  };

  public showPhotos = true;

  public showVideo = false;

  public showTour360 = false;

  public showMap = false;

  constructor(
    private readonly notificationService: NotificationService
  ) { }

  ngOnInit(): void {
    this.setPhotos();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['announcement']) {
      this.setPhotos();
    }
  }

  private setPhotos(): void {
    if (this.announcement && this.announcement.galeria.fotos.length < 3) {
      const photo: AnnouncementPhoto = {
        id: '',
        galeriaId: this.announcement.galeria.id,
        nome: '',
        ordem: null
      };

      if (this.announcement.galeria.fotos.length === 1) {
        this.announcement.galeria.fotos.push(photo, photo);
        return;
      }
      this.announcement.galeria.fotos.push(photo);
    }
  }

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
