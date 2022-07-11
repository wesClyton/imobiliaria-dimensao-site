import { AfterViewInit, Component, ElementRef, NgZone, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { MapInfoWindow, MapMarker } from '@angular/google-maps';
import { finalize, Subscription, take } from 'rxjs';
import { LoadingService } from '../../core/loading/loading.service';
import { AnnouncementAreaType } from '../announcement/enums/announcement-area-type.enum';
import { AnnouncementType as AnnouncementTypeEnum } from '../announcement/enums/announcement-type.enum';
import { AnnouncementType } from '../announcement/interfaces/announcement-type.interface';
import { Announcement } from '../announcement/interfaces/announcement.interface';
import { AnnouncementGetAllService } from '../announcement/services/announcement-get-all.service';
import { AnnouncementLinkUtil } from '../announcement/utils/announcement-link.util';
import { IconPinImage } from './icon-pin-image.enum';
import { IconPin } from './icon-pin.interface';
import { Marker } from './marker.interface';

@Component({
  selector: 'app-discover',
  templateUrl: 'discover.component.html',
  styleUrls: ['discover.component.scss'],
})
export class DiscoverComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild(MapInfoWindow, { static: false })
  public info!: MapInfoWindow;

  @ViewChild('search', { static: false })
  public searchElementRef!: ElementRef;

  public form!: UntypedFormGroup;

  public announcementTypes!: Array<AnnouncementType>;

  public latitude!: number;

  public longitude!: number;

  public announcement!: Announcement;

  public center!: google.maps.LatLngLiteral;

  public options: google.maps.MapOptions = {
    zoomControl: true,
    mapTypeControl: true,
    scaleControl: true,
    streetViewControl: true,
    rotateControl: true,
    fullscreenControl: true,
    disableDoubleClickZoom: true,
    mapTypeId: 'roadmap',
    maxZoom: 20,
    minZoom: 1,
    zoom: 13
  };

  public markers = Array<Marker>();

  public get link(): string {
    return AnnouncementLinkUtil.create(this.announcement);
  }

  public get showAreaType(): { [key in AnnouncementAreaType]: boolean } {
    return {
      CONSTRUIDA: (this.announcement.tipo !== AnnouncementTypeEnum.TerrenoUrbano) && (this.announcement.tipo !== AnnouncementTypeEnum.TerronoRural),
      TOTAL: (this.announcement.tipo === AnnouncementTypeEnum.TerrenoUrbano) || (this.announcement.tipo === AnnouncementTypeEnum.TerronoRural)
    }
  }

  private subscription = new Subscription();

  constructor(
    private readonly ngZone: NgZone,
    private readonly announcementGetAllService: AnnouncementGetAllService,
    private readonly loadingService: LoadingService,
    private readonly formBuilder: UntypedFormBuilder
  ) {
    this.loadingService.show();
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      tipoImovel: [null]
    });

    this.subscription.add(
      this.form.get('tipoImovel')?.valueChanges.subscribe(value => {
        this.loadingService.show();
        this.getAnnouncements(value);
      })
    );

    navigator?.permissions
      ?.query({ name: 'geolocation' })
      .then(permissionStatus => {
        if (permissionStatus.state === 'granted') {
          navigator?.geolocation?.getCurrentPosition((position) => {
            this.center = {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            };
          });
        } else {
          this.center = {
            lat: -23.7625196,
            lng: -53.300687
          };
        }
      });

    this.getAnnouncements();
  }

  ngAfterViewInit(): void {
    const autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement);

    autocomplete.addListener('place_changed', () => {
      this.ngZone.run(() => {
        let place: google.maps.places.PlaceResult = autocomplete.getPlace();

        if (place.geometry === undefined || place.geometry === null) {
          return;
        }

        this.latitude = place.geometry.location?.lat() as number;
        this.longitude = place.geometry.location?.lng() as number;
        this.center = {
          lat: this.latitude,
          lng: this.longitude
        };
      });
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  private getAnnouncements(announcementType?: AnnouncementTypeEnum): void {
    this.markers = new Array<Marker>();
    this.announcementGetAllService.queryFilterRemove();

    this.announcementGetAllService.queryFilterAdd([
      {
        field: 'ativo',
        value: true
      },
      {
        field: 'take',
        value: 999
      }
    ]);

    if (announcementType && (announcementType as string) !== 'null') {
      this.announcementGetAllService.queryFilterAdd({
        field: 'tipo',
        value: announcementType
      });
    }

    this.announcementGetAllService
      .getAll()
      .pipe(
        take(1),
        finalize(() => this.loadingService.hide())
      )
      .subscribe(announcements => {
        announcements.data.forEach(announcement => {
          this.markers.push({
            announcement,
            position: {
              lat: parseFloat(announcement.latitude),
              lng: parseFloat(announcement.longitude)
            }
          });
        });
      });
  }

  public openInfo(marker: MapMarker, announcement: Announcement): void {
    this.announcement = announcement;
    this.info.open(marker);
  }

  public iconPin(announcement: Announcement): IconPin {
    return {
      url: `assets/${IconPinImage[announcement.tipo]}`,
      scaledSize: new google.maps.Size(40, 40)
    }
  };

}
