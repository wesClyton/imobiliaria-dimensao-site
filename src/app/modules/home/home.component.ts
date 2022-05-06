import { Component, HostListener } from '@angular/core';
import { Banner } from '../banner/interfaces/banner.interface';

@Component({
  selector: 'app-home',
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.scss']
})
export class HomeComponent {

  public banners: Array<Banner> = [
    {
      ativo: true,
      foto: 'assets/api/apartamentos.jpg',
      id: 'id-a',
      link: '#',
      nome: 'Apartamentos'
    },
    {
      ativo: true,
      foto: 'assets/api/casas.jpg',
      id: 'id-b',
      link: '#',
      nome: 'Casas & Apartamentos'
    },
    {
      ativo: true,
      foto: 'assets/api/comercial.jpg',
      id: 'id-c',
      link: '#',
      nome: 'Comercial'
    },
    {
      ativo: true,
      foto: 'assets/api/loteamento.jpg',
      id: 'id-d',
      link: '#',
      nome: 'Loteamento'
    },
    {
      ativo: true,
      foto: 'assets/api/rural.jpg',
      id: 'id-e',
      link: '#',
      nome: 'Rural'
    }
  ];

  constructor() { }

  @HostListener('window:scroll', ['$event'])
  private onScroll(event: Event) {
    console.log('onScroll', event);
  }

}
