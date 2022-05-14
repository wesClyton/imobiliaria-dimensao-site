import { Component, ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { GoogleMap, MapInfoWindow, MapMarker } from '@angular/google-maps';
import { finalize, take } from 'rxjs';
import { LoadingService } from '../../core/loading/loading.service';
import { Announcement } from '../announcement/interfaces/announcement.interface';
import { AnnouncementGetAllService } from '../announcement/services/announcement-get-all.service';
import { AnnouncementLinkUtil } from '../announcement/utils/announcement-link.util';
import { Marker } from './marker.interface';

@Component({
  selector: 'app-discover',
  templateUrl: 'discover.component.html',
  styleUrls: ['discover.component.scss'],
})
export class DiscoverComponent implements OnInit {
  @ViewChild('myGoogleMap', { static: false })
  map!: GoogleMap;

  @ViewChild(MapInfoWindow, { static: false })
  info!: MapInfoWindow;

  @ViewChild('search', { static: false })
  public searchElementRef!: ElementRef;

  public form!: FormGroup;

  public zoom = 13;

  public maxZoom = 20;

  public minZoom = 1;

  public latitude!: number;

  public longitude!: number;

  public announcement!: Announcement;

  public center!: google.maps.LatLngLiteral;

  public options: google.maps.MapOptions = {
    zoomControl: true,
    scrollwheel: false,
    disableDoubleClickZoom: true,
    mapTypeId: 'roadmap',
    maxZoom: this.maxZoom,
    minZoom: this.minZoom
  };

  public iconPin = {
    url: 'assets/pin.svg',
    scaledSize: new google.maps.Size(40, 40),
    origin: new google.maps.Point(0, 0),
    anchor: new google.maps.Point(0, 0),
  };

  public markers = Array<Marker>();

  public get link(): string {
    return AnnouncementLinkUtil.create(this.announcement);
  }

  constructor(
    private readonly ngZone: NgZone,
    private readonly announcementGetAllService: AnnouncementGetAllService,
    private readonly loadingService: LoadingService
  ) {
    this.loadingService.show();
  }

  ngOnInit(): void {
    navigator.permissions
      .query({ name: 'geolocation' })
      .then((permissionStatus) => {
        if (permissionStatus.state === 'granted') {
          navigator.geolocation.getCurrentPosition((position) => {
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

  private getAnnouncements(): void {
    this.markers = new Array<Marker>();
    this.announcementGetAllService.queryFilterRemove();

    this.announcementGetAllService.queryFilterAdd({
      field: 'ativo',
      value: true
    });
    this.announcementGetAllService.queryFilterAdd({
      field: 'take',
      value: 999
    });

    this.announcementGetAllService
      .getAll()
      .pipe(
        take(1),
        finalize(() => this.loadingService.hide())
      )
      .subscribe(announcements => {
        announcements.data.forEach(announcement => {
          console.log(announcement)
          this.markers.push({
            announcement,
            position: {
              lat: parseFloat(announcement.latitude),
              lng: parseFloat(announcement.longitude)
            }
          });
        });

        console.log('markers', this.markers);
      });
  }

  public openInfo(marker: MapMarker, announcement: Announcement): void {
    this.announcement = announcement;
    this.info.open(marker);
  }

}
