import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { ActivatedRoute, Params, Router, UrlTree } from '@angular/router';
import { Subscription, take } from 'rxjs';
import { QueryFilter } from '../../../../shared/http/query-filter/query-filter';
import { StringUtil } from '../../../../shared/utils/string.util';
import { CityGetAll } from '../../../city/interfaces/city-get-all.interface';
import { DistrictGetAll } from '../../../district/interfaces/district-get-all.interface';
import { DistrictGetAllService } from '../../../district/services/district-get-all.service';
import { ANNOUNCEMENT_CONFIG } from '../../announcement.config';
import { AnnouncementAreaType } from '../../enums/announcement-area-type.enum';
import { AnnouncementType as AnnouncementTypeEnum } from '../../enums/announcement-type.enum';
import { AnnouncementType } from '../../interfaces/announcement-type.interface';

@Component({
  selector: 'app-announcement-search',
  templateUrl: 'announcement-search.component.html',
  styleUrls: ['announcement-search.component.scss']
})
export class AnnouncementSearchComponent implements OnInit, OnDestroy {

  public form!: UntypedFormGroup;

  public quantities = new Array<string>('1', '2', '3', '4+');

  public showFiltersAdvanced = false;

  public announcementTypes!: Array<AnnouncementType>;

  public districts!: DistrictGetAll | null;

  public cities!: CityGetAll;

  private get controlTipo(): AbstractControl | null {
    return this.form.get('tipo');
  }

  public get controlCidade(): AbstractControl | null {
    return this.form.get('cidadeId');
  }

  private get controlBairro(): AbstractControl | null {
    return this.form.get('bairroId');
  }

  private get controlValorMinimo(): AbstractControl | null {
    return this.form.get('valorMinimo');
  }

  private get controlValorMaximo(): AbstractControl | null {
    return this.form.get('valorMaximo');
  }

  private get controlAreaTotalMinima(): AbstractControl | null {
    return this.form.get('areaTotalMinima');
  }

  private get controlAreaTotalMaxima(): AbstractControl | null {
    return this.form.get('areaTotalMaxima');
  }

  private get controlAreaConstruidaMinima(): AbstractControl | null {
    return this.form.get('areaConstruidaMinima');
  }

  private get controlAreaConstruidaMaxima(): AbstractControl | null {
    return this.form.get('areaConstruidaMaxima');
  }

  public get controlBanheiros(): AbstractControl | null {
    return this.form.get('banheiros');
  }

  public get controlDormitorios(): AbstractControl | null {
    return this.form.get('dormitorios');
  }

  public get controlVagasGaragem(): AbstractControl | null {
    return this.form.get('vagasGaragem');
  }

  private get controlTipoArea(): AbstractControl | null {
    return this.form.get('tipoArea');
  }

  public get isArea(): { [key in AnnouncementAreaType]: boolean } {
    return {
      CONSTRUIDA: this.controlTipoArea?.value === AnnouncementAreaType.Construida,
      TOTAL: this.controlTipoArea?.value === AnnouncementAreaType.Total
    }
  }

  public get AnnouncementAreaType(): typeof AnnouncementAreaType {
    return AnnouncementAreaType;
  }

  private subscription = new Subscription();

  private possibleQueries!: {
    tipo: string;
    cidadeId: string;
    bairroId: string;
    valorMinimo: string;
    valorMaximo: string;
    tipoArea: string;
    areaTotalMinima: string;
    areaTotalMaxima: string;
    areaConstruidaMinima: string;
    areaConstruidaMaxima: string;
    banheiros: string;
    dormitorios: string;
    vagasGaragem: string;
  }

  public get typeIsComercial(): boolean {
    return this.controlTipo?.value === AnnouncementTypeEnum.Comercial;
  }

  public get typeIsTerrenoUrbano(): boolean {
    return this.controlTipo?.value === AnnouncementTypeEnum.TerrenoUrbano;
  }

  public get typeIsTerronoRural(): boolean {
    return this.controlTipo?.value === AnnouncementTypeEnum.TerronoRural;
  }

  constructor(
    private readonly formBuilder: UntypedFormBuilder,
    private readonly router: Router,
    private readonly districtGetAllService: DistrictGetAllService,
    private readonly activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.createForm();

    this.subscription.add(this.activatedRoute.queryParams.subscribe(queries => this.setValueForm(queries)));
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  private createForm(): void {
    this.form = this.formBuilder.group({
      tipo: [null],
      cidadeId: [null],
      bairroId: [null],
      valorMinimo: [null],
      valorMaximo: [null],
      tipoArea: [AnnouncementAreaType.Construida],
      areaTotalMinima: [null],
      areaTotalMaxima: [null],
      areaConstruidaMinima: [null],
      areaConstruidaMaxima: [null],
      banheiros: [null],
      dormitorios: [null],
      vagasGaragem: [null]
    });

    this.subscription.add(this.form.get('cidadeId')?.valueChanges.subscribe(value => this.getDistricts(value)));
    this.subscription.add(this.form.get('tipoArea')?.valueChanges.subscribe(() => {
      this.controlAreaConstruidaMinima?.reset();
      this.controlAreaConstruidaMaxima?.reset();
      this.controlAreaTotalMinima?.reset();
      this.controlAreaTotalMaxima?.reset();
    }));
  }

  private setValueForm(queries: { [key: string]: string }) {
    if (Object.keys(queries).length) {
      this.possibleQueries = {
        tipo: queries['tipo'],
        cidadeId: queries['cidadeId'],
        bairroId: queries['bairroId'],
        valorMinimo: queries['valorMinimo'],
        valorMaximo: queries['valorMaximo'],
        tipoArea: queries['tipoArea'],
        areaTotalMinima: queries['areaTotalMinima'],
        areaTotalMaxima: queries['areaTotalMaxima'],
        areaConstruidaMinima: queries['areaConstruidaMinima'],
        areaConstruidaMaxima: queries['areaConstruidaMaxima'],
        banheiros: queries['banheiros'],
        dormitorios: queries['dormitorios'],
        vagasGaragem: queries['vagasGaragem']
      }
    }

    let type: AnnouncementTypeEnum = this.activatedRoute.snapshot.params['type'];
    if (type?.includes('&')) {
      type = type.split('&')[0] as AnnouncementTypeEnum;
    }

    if (type?.includes(',')) {
      type = type.split(',')[0] as AnnouncementTypeEnum;
    }

    if (type) {
      this.possibleQueries = {
        tipo: type,
        cidadeId: queries['cidadeId'],
        bairroId: queries['bairroId'],
        valorMinimo: queries['valorMinimo'],
        valorMaximo: queries['valorMaximo'],
        tipoArea: queries['tipoArea'],
        areaTotalMinima: queries['areaTotalMinima'],
        areaTotalMaxima: queries['areaTotalMaxima'],
        areaConstruidaMaxima: queries['areaConstruidaMaxima'],
        areaConstruidaMinima: queries['areaConstruidaMinima'],
        banheiros: queries['banheiros'],
        dormitorios: queries['dormitorios'],
        vagasGaragem: queries['vagasGaragem']
      }
    }

    if (this.possibleQueries) {
      if (this.valueExist(this.possibleQueries.tipo)) {
        this.controlTipo?.setValue(this.possibleQueries.tipo);
      }
      if (this.valueExist(this.possibleQueries.cidadeId)) {
        this.controlCidade?.setValue(this.possibleQueries.cidadeId);
      }
      if (this.valueExist(this.possibleQueries.bairroId)) {
        this.controlBairro?.setValue(this.possibleQueries.bairroId);
      }
      if (this.valueExist(this.possibleQueries.bairroId)) {
        this.controlBairro?.setValue(this.possibleQueries.bairroId);
      }
      if (this.valueExist(this.possibleQueries.valorMinimo)) {
        this.controlValorMinimo?.setValue(StringUtil.formatMaskDecimalInValueLoaded(this.possibleQueries.valorMinimo));
        this.showFiltersAdvanced = true;
      }
      if (this.valueExist(this.possibleQueries.valorMaximo)) {
        this.controlValorMaximo?.setValue(StringUtil.formatMaskDecimalInValueLoaded(this.possibleQueries.valorMaximo));
        this.showFiltersAdvanced = true;
      }
      if (this.valueExist(this.possibleQueries.tipoArea)) {
        this.controlTipoArea?.setValue(this.possibleQueries.tipoArea);
      }
      if (this.isArea.CONSTRUIDA) {
        if (this.valueExist(this.possibleQueries.areaConstruidaMinima)) {
          this.controlAreaConstruidaMinima?.setValue(StringUtil.formatMaskDecimalInValueLoaded(this.possibleQueries.areaConstruidaMinima));
          this.showFiltersAdvanced = true;
        }
        if (this.valueExist(this.possibleQueries.areaConstruidaMaxima)) {
          this.controlAreaConstruidaMaxima?.setValue(StringUtil.formatMaskDecimalInValueLoaded(this.possibleQueries.areaConstruidaMaxima));
          this.showFiltersAdvanced = true;
        }
      }
      if (this.isArea.TOTAL) {
        if (this.valueExist(this.possibleQueries.areaTotalMinima)) {
          this.controlAreaTotalMinima?.setValue(StringUtil.formatMaskDecimalInValueLoaded(this.possibleQueries.areaTotalMinima));
          this.showFiltersAdvanced = true;
        }
        if (this.valueExist(this.possibleQueries.areaTotalMaxima)) {
          this.controlAreaTotalMaxima?.setValue(StringUtil.formatMaskDecimalInValueLoaded(this.possibleQueries.areaTotalMaxima));
          this.showFiltersAdvanced = true;
        }
      }
      if (this.valueExist(this.possibleQueries.banheiros)) {
        this.controlBanheiros?.setValue(this.possibleQueries.banheiros);
        this.showFiltersAdvanced = true;
      }
      if (this.valueExist(this.possibleQueries.dormitorios)) {
        this.controlDormitorios?.setValue(this.possibleQueries.dormitorios);
        this.showFiltersAdvanced = true;
      }
      if (this.valueExist(this.possibleQueries.vagasGaragem)) {
        this.controlVagasGaragem?.setValue(this.possibleQueries.vagasGaragem);
        this.showFiltersAdvanced = true;
      }
    }
  }

  private valueExist(value: string): boolean {
    return value && value !== 'null' ? true : false;
  }

  private getDistricts(cityId: string): void {
    this.districtGetAllService.queryFilterRemove();
    this.districts = null;

    if (!this.valueExist(cityId)) {
      return;
    }

    this.districtGetAllService.queryFilterAdd([
      {
        field: 'cidadeId',
        value: cityId
      },
      {
        field: 'take',
        value: 999
      }
    ]);

    this.districtGetAllService
      .getAll()
      .pipe(take(1))
      .subscribe((districts) => {
        this.districts = districts;
        if (this.possibleQueries?.bairroId) {
          setTimeout(() => this.controlBairro?.setValue(this.possibleQueries.bairroId), 0);
        }
      });
  }

  public toggleTypeFilter(): void {
    this.showFiltersAdvanced = !this.showFiltersAdvanced;
  }

  public resetAdvancedFilter(): void {
    this.form.reset();
    this.router.navigateByUrl(ANNOUNCEMENT_CONFIG.pathFront);
  }

  public submit(): void {
    const queryParamsCurrent = (this.router['currentUrlTree'] as UrlTree).queryParams;
    let queryParams: Params | null | undefined = {};

    if (queryParamsCurrent) {
      Object.keys(queryParamsCurrent).forEach(key => {
        let value = StringUtil.prepareSearchValue(key, queryParamsCurrent[key]);

        if (QueryFilter.canAddQueryFilterWithValue(value)) {
          queryParams = { ...queryParams, [key]: value }
        }
      });
    }

    const constrols = this.form.controls;

    Object.keys(constrols).forEach(key => {
      let value = StringUtil.prepareSearchValue(key, constrols[key].value);

      if (QueryFilter.canAddQueryFilterWithValue(value)) {
        queryParams = { ...queryParams, [key]: value }
      }
    });

    this.router.navigate([ANNOUNCEMENT_CONFIG.pathFront], { queryParams });
  }

}
