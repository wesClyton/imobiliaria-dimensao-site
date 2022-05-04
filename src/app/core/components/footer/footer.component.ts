import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { APP_CONFIG } from '../../../app.config';
import { Banner } from '../../../modules/banner/interfaces/banner.interface';
import { ModuleConfig } from '../../../shared/interfaces/module-config.interface';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {

  public get APP_CONFIG(): ModuleConfig {
    return APP_CONFIG;
  }

  public get anoCorrente(): number {
    return new Date().getFullYear();
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

  public navigateHome(): void {
    this.router.navigateByUrl(APP_CONFIG.pathFront);
  }

  public navigateCorreaFavarao(): void {
    this.router.navigateByUrl(APP_CONFIG.pathFront);
  }

  public navigateTerms(): void {
    this.router.navigateByUrl(APP_CONFIG.pathFront);
  }

  public navigatePolicy(): void {
    this.router.navigateByUrl(APP_CONFIG.pathFront);
  }
}
