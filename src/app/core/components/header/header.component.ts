import { AfterViewInit, Component, ElementRef, OnDestroy, QueryList, ViewChildren } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { APP_CONFIG } from '../../../app.config';
import { ANNOUNCEMENT_CONFIG } from '../../../modules/announcement/announcement.config';
import { Banner } from '../../../modules/banner/interfaces/banner.interface';
import { BannerGetAllService } from '../../../modules/banner/services/banner-get-all.service';
import { ModuleConfig } from '../../../shared/interfaces/module-config.interface';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements AfterViewInit, OnDestroy {

  public menuActive = false;

  public subMenuActive = false;

  public get APP_CONFIG(): ModuleConfig {
    return APP_CONFIG;
  }

  public get isHome(): boolean {
    return window.location.pathname === environment.baseUrl;
  }

  public banners!: Array<Banner>;

  @ViewChildren('linkFilter')
  public linksFilter!: QueryList<ElementRef>;

  private subscription = new Subscription();

  constructor(
    private readonly router: Router,
    private readonly bannerGetAllService: BannerGetAllService
  ) { }

  ngAfterViewInit(): void {
    this.banners = this.bannerGetAllService.items;
    if (!this.banners) {
      this.subscription.add(this.bannerGetAllService.banners$.subscribe((banners) => this.banners = banners.data));
    }

    this.linksFilter.forEach(link => link.nativeElement.addEventListener('click', this.onClickLink.bind(this)));
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  private onClickLink(event: PointerEvent): void {
    event.preventDefault();
  }

  public navigateFilter(banner: Banner): void {
    this.router.navigate(
      [ANNOUNCEMENT_CONFIG.pathFront],
      { queryParams: { tipo: banner.nome }
    });
    this.showMenu();
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
    this.router.navigateByUrl(`${APP_CONFIG.pathFront}/onde-encontrar`);
  }

}
