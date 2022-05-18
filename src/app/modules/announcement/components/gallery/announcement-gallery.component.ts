import { Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild, ViewEncapsulation } from '@angular/core';
import { MapInfoWindow } from '@angular/google-maps';
import SwiperCore, { Mousewheel, Navigation, SwiperOptions } from 'swiper';
import { NotificationService } from '../../../../core/notification/notification.service';
import { CopyClipboard } from '../../../../shared/utils/copy-clipboard';
import { Marker } from '../../../discover/marker.interface';
import { AnnouncementPhoto } from '../../interfaces/announcement-photo.interface';
import { Announcement } from '../../interfaces/announcement.interface';
import { AnnouncementLinkUtil } from '../../utils/announcement-link.util';
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

  @ViewChild(MapInfoWindow, { static: false })
  public info!: MapInfoWindow;

  public isModalOpened = false;

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

  public center!: google.maps.LatLngLiteral;

  public marker!: Marker;

  public options: google.maps.MapOptions = {
    zoomControl: true,
    scrollwheel: false,
    disableDoubleClickZoom: true,
    mapTypeId: 'roadmap',
    maxZoom: 20,
    minZoom: 1,
    zoom: 13
  };

  public iconPin = {
    url: 'assets/pin.svg',
    scaledSize: new google.maps.Size(40, 40),
    origin: new google.maps.Point(0, 0),
    anchor: new google.maps.Point(0, 0),
  };

  public get link(): string {
    return AnnouncementLinkUtil.create(this.announcement);
  }

  constructor(
    private readonly notificationService: NotificationService
  ) { }

  ngOnInit(): void {
    this.setPhotos();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['announcement'] && !changes['announcement'].firstChange) {
      this.setPhotos();
      this.resetButtons();
      this.showPhotos = true;
    }
  }

  private initMap(): void {
    if (this.announcement && this.announcement.latitude && this.announcement.latitude) {
      this.center = {
        lat: parseFloat(this.announcement.latitude),
        lng: parseFloat(this.announcement.longitude)
      };

      this.marker = {
        announcement: this.announcement,
        position: {
          lat: parseFloat(this.announcement.latitude),
          lng: parseFloat(this.announcement.longitude)
        }
      }
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

  public modalShow(): void {
    this.isModalOpened = true;
  }

  public modalHide(): void {
    this.isModalOpened = false;
  }

  public openModal(): void {
    if (!this.isModalOpened) {
      this.modalShow();
    }
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
    this.initMap();
  }

  public copyLink(): void {
    CopyClipboard.copy(window.location.href);
    this.notificationService.success('Link copiado para área de transferência');
  }
}
