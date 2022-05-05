import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { HttpStatusCode } from '../../shared/interfaces/http-status-code.enum';

@Component({
  selector: 'app-page-erro',
  templateUrl: './page-erro.component.html',
  styleUrls: ['./page-erro.component.scss']
})
export class PageErroComponent implements OnInit, OnDestroy {

  private statusCode!: HttpStatusCode;

  private get isStatusUnauthorized(): boolean {
    return this.statusCode === HttpStatusCode.Unauthorized;
  }

  private get isInternalServerError(): boolean {
    return this.statusCode === HttpStatusCode.InternalServerError;
  }

  public get message(): string {
    let value = 'Página não encontrada!';
    if (this.isInternalServerError) {
      value = 'Ocorreu um erro interno no servidor.';
    }
    if (this.isStatusUnauthorized) {
      value = 'Seu acesso expirou ou não tem permissão para acessar essa página!';
    }
    return value;
  }

  public get icon(): string {
    let value = 'sentiment_dissatisfied';
    if (this.isInternalServerError) {
      value = 'dns';
    }
    if (this.isStatusUnauthorized) {
      value = 'block';
    }
    return value;
  }

  private subscription = new Subscription();

  constructor(
    private readonly location: Location,
    private readonly activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.subscription.add(
      this.activatedRoute.queryParams.subscribe(params => {
        if (params['code']) {
          this.statusCode = parseInt(params['code'], 10);
        }
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  public goBack(): void {
    if (this.statusCode === undefined || this.statusCode === HttpStatusCode.NotFound) {
      this.location.back();
      return;
    }
  }

}
