import { Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { APP_CONFIG } from '../../../app.config';
import { PageMetaTag } from '../../interfaces/page-meta-tag.interface';

@Injectable({
  providedIn: 'root'
})
export class MetaTagService {

  private readonly imageDefault = 'https://imobiliariadimensao.com.br/assets/imobiliaria-dimensao-default.jpg';

  private readonly descriptionDefault = 'Comprar e vender casas, terrenos e apartamentos nunca foi tão fácil! Imobiliária Dimensão, há mais de 35 anos realizando sonhos em Umuarama e Região.';

  constructor(
    private readonly metaService: Meta,
    private readonly titleService: Title
  ) { }

  public update(pageMetaTag?: PageMetaTag): void {
    pageMetaTag = { ...pageMetaTag }

    pageMetaTag.title = pageMetaTag.title ? `${pageMetaTag.title} - ${APP_CONFIG.name}` : APP_CONFIG.name;

    this.metaService.updateTag({ name: 'twitter:card', content: 'summary' });
    this.metaService.updateTag({ name: 'twitter:title', content: pageMetaTag.title || APP_CONFIG.name });
    this.metaService.updateTag({ name: 'twitter:description', content: pageMetaTag.description || this.descriptionDefault });
    this.metaService.updateTag({ name: 'twitter:image', content: pageMetaTag.image || this.imageDefault });

    this.metaService.updateTag({ property: 'og:type', content: 'website' });
    this.metaService.updateTag({ property: 'og:site_name', content: APP_CONFIG.name });
    this.metaService.updateTag({ property: 'og:title', content: pageMetaTag.title || APP_CONFIG.name });
    this.metaService.updateTag({ property: 'og:description', content: pageMetaTag.description || this.descriptionDefault });
    this.metaService.updateTag({ property: 'og:image', content: pageMetaTag.image || this.imageDefault });
    this.metaService.updateTag({ property: 'og:url', content: location.href });

    this.titleService.setTitle(pageMetaTag.title || APP_CONFIG.name);
  }

}
