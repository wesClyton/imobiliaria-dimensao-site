import { AfterViewInit, Component, ElementRef, QueryList, ViewChildren } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../../environments/environment';
import { APP_CONFIG } from '../../../app.config';
import { Banner } from '../../../modules/banner/interfaces/banner.interface';
import { ModuleConfig } from '../../../shared/interfaces/module-config.interface';
import { ScrollTopService } from '../../../shared/services/scroll-top/scroll-top.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements AfterViewInit {

  public menuActive = false;

  public subMenuActive = false;

  public get APP_CONFIG(): ModuleConfig {
    return APP_CONFIG;
  }

  public get isHome(): boolean {
    return window.location.pathname === environment.baseUrl;
  }

  public banners: Array<Banner> = [
    {
      ativo: true,
      foto: '',
      id: 'id-a',
      link: '#',
      nome: 'Apartamentos'
    },
    {
      ativo: true,
      foto: '',
      id: 'id-b',
      link: '#',
      nome: 'Casas & Apartamentos'
    },
    {
      ativo: true,
      foto: '',
      id: 'id-c',
      link: '#',
      nome: 'Comercial'
    },
    {
      ativo: true,
      foto: '',
      id: 'id-d',
      link: '#',
      nome: 'Loteamento'
    },
    {
      ativo: true,
      foto: '',
      id: 'id-e',
      link: '#',
      nome: 'Rural'
    }
  ];

  @ViewChildren('linkOnePage')
  public linksOnePage!: QueryList<ElementRef>;

  constructor(
    private readonly router: Router,
    private readonly scrollTopService: ScrollTopService
  ) { }

  ngAfterViewInit(): void {
    this.linksOnePage.forEach(link => link.nativeElement.addEventListener('click', this.onClickLink.bind(this)));
  }

  private onClickLink(event: PointerEvent): void {
    event.preventDefault();
    const element = event.target as HTMLAnchorElement;
    const section = this.getSection(element);
    if (section && section.id) {
      this.scrollTopService.scrollTop(section);
    }
    this.showMenu();
  }

  private getSection(element: HTMLAnchorElement): HTMLElement {
    return document.getElementById(element.hash.split('#')[1]) as HTMLElement;
  }

  public showMenu(): void {
    this.menuActive = !this.menuActive;
    if (!this.menuActive) {
      this.subMenuActive = false;
    }
  }

  public showSubMenu(event: Event): void {
    event.preventDefault();
    this.subMenuActive = !this.subMenuActive;
  }

  private hideMenus(): void {
    this.menuActive = false;
    this.subMenuActive = false;
  }

  public navigateHome(): void {
    this.hideMenus();
    this.router.navigateByUrl(APP_CONFIG.pathFront);
  }

  public navigateQuemSomos(): void {
    this.hideMenus();
    this.router.navigateByUrl('quem-somos');
  }

  public navigateAnuncios(): void {
    this.hideMenus();
    this.router.navigateByUrl(`${APP_CONFIG.pathFront}/anuncios`);
  }

  public navigateAnuncie(): void {
    this.hideMenus();
    this.router.navigateByUrl(`${APP_CONFIG.pathFront}/anuncie`);
  }

  public navigateCorretores(): void {
    this.hideMenus();
    this.router.navigateByUrl(`${APP_CONFIG.pathFront}/corretores`);
  }

  public navigateContato(): void {
    this.hideMenus();
    this.router.navigateByUrl(`${APP_CONFIG.pathFront}/contato`);
  }

  public navigateDescubra(): void {
    this.hideMenus();
    this.router.navigateByUrl(`${APP_CONFIG.pathFront}/descubra`);
  }

}
