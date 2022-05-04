import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { APP_CONFIG } from '../../../app.config';
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
