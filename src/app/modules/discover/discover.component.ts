import { Component, OnInit, ViewChild } from "@angular/core";
import { AbstractControl, FormBuilder, FormGroup } from "@angular/forms";
import { MapInfoWindow, MapMarker } from "@angular/google-maps";


@Component({
  selector: 'app-discover',
  templateUrl: 'discover.component.html',
  styleUrls: ['discover.component.scss']
})
export class DiscoverComponent implements OnInit {

  @ViewChild(MapInfoWindow, { static: false }) infoWindow!: MapInfoWindow;
  @ViewChild('markerElement', { static: false }) markerElement!: any;

  infoContent!: string;

  public form!: FormGroup;

  private get controlEndereco(): AbstractControl | null {
    return this.form.get('endereco');
  }

  public options!: google.maps.MapOptions;
  public markerOptions: google.maps.MarkerOptions = {};
  public spots: { id: number; lat: number; lng: number }[] = [
    { id: 1, lat: 48.85952222328431, lng: 2.3347153257887454 },
    { id: 2, lat: 48.80528296155103, lng: 2.2111191343824954 },
    { id: 3, lat: 48.63132261107716, lng: 2.4308456968824954 },
    { id: 4, lat: 48.77633134372322, lng: 2.4665512632887454 },
    { id: 5, lat: 48.7871901580939, lng: 2.3127426695387454 },
  ];

  public infowindow!: google.maps.InfoWindow;

  constructor(
    private readonly formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.createForm();
    this.loadScript();
  }

  private createForm(): void {
    this.form = this.formBuilder.group({
      endereco: [null],
    });
  }

  public submit(): void {
    console.log('submit');
  }

  public loadScript() {
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyAswJeA21rkAFLZfH3sWwrq7VLD_J5SdLs&libraries=visualization';
    document.body.appendChild(script);

    setTimeout(() => {
      this.initMap();
    }, 100);
  }

  public initMap() {

    const myLatLng = { lat: 48.829677, lng: 2.239609 };
  
    this.options = {
      center: myLatLng,
      zoom: 10,
    };
  }

  selectMarker(marker: MapMarker, content: string) {
    this.infoContent = content;
    this.infoWindow.open(marker);
  }

}