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

  public quantities = new Array<string>('1', '2', '3', '4');

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

  public get isType(): { [key in AnnouncementTypeEnum]: boolean } {
    return {
      APARTAMENTO: this.controlTipo?.value === AnnouncementTypeEnum.Apartamento,
      CASA: this.controlTipo?.value === AnnouncementTypeEnum.Casa,
      COMERCIAL: this.controlTipo?.value === AnnouncementTypeEnum.Comercial,
      SOBRADO: this.controlTipo?.value === AnnouncementTypeEnum.Sobrado,
      TERRENO_URBANO: this.controlTipo?.value === AnnouncementTypeEnum.TerrenoUrbano,
      TERRENO_RURAL: this.controlTipo?.value === AnnouncementTypeEnum.TerronoRural
    }
  }

  public get showInputTipoArea(): boolean {
    return (
      (this.isType.APARTAMENTO || this.isType.CASA || this.isType.COMERCIAL || this.isType.SOBRADO) ||
      (!this.controlTipo?.value || this.controlTipo?.value === 'null')
    )
  }

  public get showInputAreaConstruida(): boolean {
    return (
      (this.controlTipo?.value || this.controlTipo?.value !== 'null') &&
      !this.isArea.TOTAL &&
      (this.isArea.CONSTRUIDA && !this.isType.TERRENO_RURAL && !this.isType.TERRENO_URBANO)
    );
  }

  public get showInputAreaTotal(): boolean {
    return (
      (this.controlTipo?.value || this.controlTipo?.value !== 'null') &&
      (this.isType.TERRENO_RURAL || this.isType.TERRENO_URBANO) ||
      (this.isArea.TOTAL)
    )
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
      tipoArea: [null],
      areaTotalMinima: [null],
      areaTotalMaxima: [null],
      areaConstruidaMinima: [null],
      areaConstruidaMaxima: [null],
      banheiros: [null],
      dormitorios: [null],
      vagasGaragem: [null]
    });

    this.subscription.add(this.controlCidade?.valueChanges.subscribe(value => this.getDistricts(value)));

    this.subscription.add(this.controlTipoArea?.valueChanges.subscribe(() => {
      this.controlAreaConstruidaMinima?.reset();
      this.controlAreaConstruidaMaxima?.reset();
      this.controlAreaTotalMinima?.reset();
      this.controlAreaTotalMaxima?.reset();
    }));

    this.subscription.add(this.controlTipo?.valueChanges.subscribe(() => {
      this.controlTipoArea?.reset();
      this.controlBanheiros?.reset();
      this.controlDormitorios?.reset();
      this.controlVagasGaragem?.reset();
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
        this.setTrueFiltersAdvanced();
      }
      if (this.valueExist(this.possibleQueries.valorMaximo)) {
        this.controlValorMaximo?.setValue(StringUtil.formatMaskDecimalInValueLoaded(this.possibleQueries.valorMaximo));
        this.setTrueFiltersAdvanced();
      }
      if (this.valueExist(this.possibleQueries.tipoArea)) {
        this.controlTipoArea?.setValue(this.possibleQueries.tipoArea);
      }
      if (this.isArea.CONSTRUIDA) {
        if (this.valueExist(this.possibleQueries.areaConstruidaMinima)) {
          this.controlAreaConstruidaMinima?.setValue(StringUtil.formatMaskDecimalInValueLoaded(this.possibleQueries.areaConstruidaMinima));
          this.setTrueFiltersAdvanced();
        }
        if (this.valueExist(this.possibleQueries.areaConstruidaMaxima)) {
          this.controlAreaConstruidaMaxima?.setValue(StringUtil.formatMaskDecimalInValueLoaded(this.possibleQueries.areaConstruidaMaxima));
          this.setTrueFiltersAdvanced();
        }
      }
      if (this.isArea.TOTAL) {
        if (this.valueExist(this.possibleQueries.areaTotalMinima)) {
          this.controlAreaTotalMinima?.setValue(StringUtil.formatMaskDecimalInValueLoaded(this.possibleQueries.areaTotalMinima));
          this.setTrueFiltersAdvanced();
        }
        if (this.valueExist(this.possibleQueries.areaTotalMaxima)) {
          this.controlAreaTotalMaxima?.setValue(StringUtil.formatMaskDecimalInValueLoaded(this.possibleQueries.areaTotalMaxima));
          this.setTrueFiltersAdvanced();
        }
      }
      if (this.valueExist(this.possibleQueries.banheiros)) {
        this.controlBanheiros?.setValue(this.possibleQueries.banheiros);
        this.setTrueFiltersAdvanced();
      }
      if (this.valueExist(this.possibleQueries.dormitorios)) {
        this.controlDormitorios?.setValue(this.possibleQueries.dormitorios);
        this.setTrueFiltersAdvanced();
      }
      if (this.valueExist(this.possibleQueries.vagasGaragem)) {
        this.controlVagasGaragem?.setValue(this.possibleQueries.vagasGaragem);
        this.setTrueFiltersAdvanced();
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

  public setFalseFiltersAdvanced(): void {
    this.showFiltersAdvanced = false;
  }

  public setTrueFiltersAdvanced(): void {
    this.showFiltersAdvanced = true;
  }

  public clickRadio(control: AbstractControl | null, value: string): void {
    if (control?.value?.includes(value)) {
      control.reset();
    }
  }

  public resetAdvancedFilter(): void {
    this.router.navigateByUrl(ANNOUNCEMENT_CONFIG.pathFront);
    setTimeout(() => this.form.reset());
  }

  public submit(): void {
    this.router.navigate([ANNOUNCEMENT_CONFIG.pathFront]);

    let queryParams: Params | null | undefined = {};

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
