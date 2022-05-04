import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { APP_CONFIG } from '../../../app.config';
import { Banner } from '../../../modules/banner/interfaces/banner.interface';
import { ModuleConfig } from '../../../shared/interfaces/module-config.interface';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  public menuActive = false;

  public subMenuActive = false;

  public get APP_CONFIG(): ModuleConfig {
    return APP_CONFIG;
  }

  public get isHome(): boolean {
    return true;
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

  constructor(
    private readonly router: Router
  ) { }

  public showMenu(): void {
    this.menuActive = !this.menuActive;
    if (!this.menuActive) {
      this.subMenuActive = false;
    }
  }

  public showSubMenu(): void {
    this.subMenuActive = !this.subMenuActive;
  }

  public navigateHome(): void {
    this.router.navigateByUrl(APP_CONFIG.pathFront);
  }

}
