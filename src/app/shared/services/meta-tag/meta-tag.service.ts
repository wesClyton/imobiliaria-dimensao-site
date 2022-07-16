import { Inject, Injectable } from '@angular/core';
import { Meta, MetaDefinition, Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { APP_CONFIG } from '../../../app.config';
import { HOST_URL } from '../../../tokens/host-url';
import { PageMetaTag } from '../../interfaces/page-meta-tag.interface';

@Injectable({
  providedIn: 'root'
})
export class MetaTagService {

  private readonly default: PageMetaTag = {
    author: APP_CONFIG.name,
    image: '',
    description: 'Comprar e vender casas, terrenos e apartamentos nunca foi tão fácil! Imobiliária Dimensão, há mais de 35 anos realizando sonhos em Umuarama e Região.',
    keywords: [''],
    title: APP_CONFIG.name,
    type: 'website'
  }

  constructor(
    private readonly metaService: Meta,
    private readonly titleService: Title,
    private readonly router: Router,
    @Inject(HOST_URL)
    private readonly hostUrl: string
  ) { }

  public update(metaTag: PageMetaTag = this.default, index: boolean = false): void {
    const pageMetadata: PageMetaTag = {...this.default, ...metaTag};
    const metatags: MetaDefinition[] = this.generateMetaDefinitions(pageMetadata);

    this.metaService.addTags([
     ...metatags,
     { property: 'og:url', content: `${this.hostUrl}${this.router.url}`},
     { name: 'robots', content: index ? 'index, follow' : 'noindex' },
     { name: 'viewport', content: 'width=device-width, initial-scale=1' },
     { 'http-equiv': 'Content-Type', content: 'text/html; charset=utf-8' },
    ]);

    this.titleService.setTitle(pageMetadata.title || this.default.title || '');
  }

  private generateMetaDefinitions(metaTag: Partial<PageMetaTag>): Array<MetaDefinition> {
    return [
      { name: 'title', content: metaTag.title || this.default.title || '' },
      { property: 'og:title', content: metaTag.title || this.default.title || '' },
      { name: 'description', content: metaTag.description || this.default.description || '' },
      { property: 'og:description', content: metaTag.description || this.default.description || '' },
      { name: 'author', content: metaTag.author || this.default.author || '' },
      { property: 'og:author', content: metaTag.author || this.default.author || '' },
      { name: 'keywords', content: metaTag?.keywords?.join(', ') || this.default.keywords?.join(', ') || '' },
      { property: 'og:type', content: metaTag.type || this.default.type || '' }
    ];
  }

}
