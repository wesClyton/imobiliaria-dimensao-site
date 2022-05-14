import {
  Component,
  ElementRef,
  NgZone,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { GoogleMap, MapInfoWindow, MapMarker } from '@angular/google-maps';

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
  @ViewChild('search')
  public searchElementRef!: ElementRef;

  public form!: FormGroup;

  zoom = 13;
  maxZoom = 20;
  minZoom = 1;
  latitude!: any;
  longitude!: any;
  infoMarker!: any;
  center!: google.maps.LatLngLiteral;
  options: google.maps.MapOptions = {
    zoomControl: true,
    scrollwheel: false,
    disableDoubleClickZoom: true,
    mapTypeId: 'roadmap',
    maxZoom: this.maxZoom,
    minZoom: this.minZoom,
  };
  iconPin = {
    url: 'assets/pin.svg',
    scaledSize: new google.maps.Size(40, 40),
    origin: new google.maps.Point(0, 0),
    anchor: new google.maps.Point(0, 0),
  };

  markers = [
    {
      position: {
        lat: -26.292973864220897,
        lng: -48.85230758990844,
      },
      description: {
        foto: 'https://imobiliaria-dimensao.s3.amazonaws.com/anuncios/c0cf7b91-3eb5-4faf-8df3-cb4f4cc3d912/87acf42768fe1b45424c-A702657ABD52AC7A4AC3AD287C6C4B09.jpg',
        tipo: 'Apartamento',
        areaTotal: '10080mts',
        dormitorios: '2',
        banheiros: '2',
        vagasGaragem: '1',
        valor: '3.300.00,00',
      },
    },
    {
      position: {
        lat: -26.293082688906047,
        lng: -48.85093065252875,
      },
      description: {
        foto: 'https://imobiliaria-dimensao.s3.amazonaws.com/anuncios/c0cf7b91-3eb5-4faf-8df3-cb4f4cc3d912/87acf42768fe1b45424c-A702657ABD52AC7A4AC3AD287C6C4B09.jpg',
        tipo: 'Apartamento',
        areaTotal: '10010080mts',
        dormitorios: '2',
        banheiros: '2',
        vagasGaragem: '1',
        valor: '3.300.00,00',
      },
    },
    {
      position: {
        lat: -26.292327715544538,
        lng: -48.85165515665002,
      },
      description: {
        foto: 'https://imobiliaria-dimensao.s3.amazonaws.com/anuncios/c0cf7b91-3eb5-4faf-8df3-cb4f4cc3d912/87acf42768fe1b45424c-A702657ABD52AC7A4AC3AD287C6C4B09.jpg',
        tipo: 'Apartamento',
        areaTotal: '10010080mts',
        dormitorios: '2',
        banheiros: '2',
        vagasGaragem: '1',
        valor: '3.300.00,00',
      },
    },
    {
      position: {
        lat: -26.29278342077193,
        lng: -48.849401986329326,
      },
      description: {
        foto: 'https://imobiliaria-dimensao.s3.amazonaws.com/anuncios/c0cf7b91-3eb5-4faf-8df3-cb4f4cc3d912/87acf42768fe1b45424c-A702657ABD52AC7A4AC3AD287C6C4B09.jpg',
        tipo: 'Apartamento',
        areaTotal: '10010080mts',
        dormitorios: '2',
        banheiros: '2',
        vagasGaragem: '1',
        valor: '3.300.00,00',
      },
    },
    {
      position: {
        lat: -26.294987104360228,
        lng: -48.84947026421592,
      },
      description: {
        foto: 'https://imobiliaria-dimensao.s3.amazonaws.com/anuncios/c0cf7b91-3eb5-4faf-8df3-cb4f4cc3d912/87acf42768fe1b45424c-A702657ABD52AC7A4AC3AD287C6C4B09.jpg',
        tipo: 'Apartamento',
        areaTotal: '10080mts',
        dormitorios: '2',
        banheiros: '2',
        vagasGaragem: '1',
        valor: '3.300.00,00',
      },
    },
    {
      position: {
        lat: -26.29085263265565,
        lng: -48.8531772292115,
      },
      description: {
        foto: 'https://imobiliaria-dimensao.s3.amazonaws.com/anuncios/c0cf7b91-3eb5-4faf-8df3-cb4f4cc3d912/87acf42768fe1b45424c-A702657ABD52AC7A4AC3AD287C6C4B09.jpg',
        tipo: 'Apartamento',
        areaTotal: '10080mts',
        dormitorios: '2',
        banheiros: '2',
        vagasGaragem: '1',
        valor: '3.300.00,00',
      },
    },
    {
      position: {
        lat: -26.289380499043364,
        lng: -48.8508315510223,
      },
      description: {
        foto: 'https://imobiliaria-dimensao.s3.amazonaws.com/anuncios/c0cf7b91-3eb5-4faf-8df3-cb4f4cc3d912/87acf42768fe1b45424c-A702657ABD52AC7A4AC3AD287C6C4B09.jpg',
        tipo: 'Apartamento',
        areaTotal: '10080mts',
        dormitorios: '2',
        banheiros: '2',
        vagasGaragem: '1',
        valor: '3.300.00,00',
      },
    },
    {
      position: {
        lat: -26.290391581827432,
        lng: -48.84903620511575,
      },
      description: {
        foto: 'https://imobiliaria-dimensao.s3.amazonaws.com/anuncios/c0cf7b91-3eb5-4faf-8df3-cb4f4cc3d912/87acf42768fe1b45424c-A702657ABD52AC7A4AC3AD287C6C4B09.jpg',
        tipo: 'Apartamento',
        areaTotal: '10080mts',
        dormitorios: '2',
        banheiros: '2',
        vagasGaragem: '1',
        valor: '3.300.00,00',
      },
    },
    {
      position: {
        lat: -26.291418832908967,
        lng: -48.85434104628686,
      },
      description: {
        foto: 'https://imobiliaria-dimensao.s3.amazonaws.com/anuncios/c0cf7b91-3eb5-4faf-8df3-cb4f4cc3d912/87acf42768fe1b45424c-A702657ABD52AC7A4AC3AD287C6C4B09.jpg',
        tipo: 'Apartamento',
        areaTotal: '10080mts',
        dormitorios: '2',
        banheiros: '2',
        vagasGaragem: '1',
        valor: '3.300.00,00',
      },
    },
  ] as any;

  constructor(private ngZone: NgZone) {}

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
            lng: -53.300687,
          };
        }
      });
  }

  eventHandler(event: any, name: string) {}

  openInfo(marker: MapMarker, content: string) {
    this.infoMarker = content;
    this.info.open(marker);
  }

  // Campo de busca
  ngAfterViewInit(): void {
    // Binding autocomplete to search input control
    let autocomplete = new google.maps.places.Autocomplete(
      this.searchElementRef.nativeElement
    );
    autocomplete.addListener('place_changed', () => {
      this.ngZone.run(() => {
        //get the place result
        let place: google.maps.places.PlaceResult = autocomplete.getPlace();

        //verify result
        if (place.geometry === undefined || place.geometry === null) {
          return;
        }

        //set latitude, longitude and zoom
        this.latitude = place.geometry.location?.lat();
        this.longitude = place.geometry.location?.lng();
        this.center = {
          lat: this.latitude,
          lng: this.longitude,
        };
      });
    });
  }
}
