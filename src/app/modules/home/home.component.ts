import { Component, ElementRef, HostListener, QueryList, ViewChildren } from '@angular/core';
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

  private lastScrollTop = 0;

  private bannerCurrent = 0;

  @ViewChildren('banner')
  private bannersElement!: QueryList<ElementRef>;

  constructor() { }

  // @HostListener('window:scroll', ['$event'])
  // private onScroll(event: any) {
  //   const scrollDocument = event.target.scrollingElement.scrollTop;

  //   console.log('bannersElement', this.bannersElement['_results']);

  //   this.bannersElement.forEach(banner => {
  //     const scrollBanner = (banner.nativeElement as HTMLElement).offsetTop;
  //     if (scrollBanner === this.bannerCurrent) { }
  //   });

  //   if (scrollDocument > this.lastScrollTop) {
  //     //  console.log('down');
  //   } else {
  //     // console.log('up');
  //   }
  //   this.lastScrollTop = scrollDocument <= 0 ? 0 : scrollDocument;
  // }

}
