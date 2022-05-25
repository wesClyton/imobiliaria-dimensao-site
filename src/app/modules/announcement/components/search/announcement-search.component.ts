import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, take } from 'rxjs';
import { StringUtil } from '../../../../shared/utils/string.util';
import { CityGetAll } from '../../../city/interfaces/city-get-all.interface';
import { DistrictGetAll } from '../../../district/interfaces/district-get-all.interface';
import { DistrictGetAllService } from '../../../district/services/district-get-all.service';
import { ANNOUNCEMENT_CONFIG } from '../../announcement.config';
import { AnnouncementType as AnnouncementTypeEnum } from '../../enums/announcement-type.enum';
import { AnnouncementType } from '../../interfaces/announcement-type.interface';

@Component({
  selector: 'app-announcement-search',
  templateUrl: 'announcement-search.component.html',
  styleUrls: ['announcement-search.component.scss']
})
export class AnnouncementSearchComponent implements OnInit, OnDestroy {

  public form!: FormGroup;

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

  private get controlAreaMinima(): AbstractControl | null {
    return this.form.get('areaMinima');
  }

  private get controlAreaMaxima(): AbstractControl | null {
    return this.form.get('areaMaxima');
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

  private subscription = new Subscription();

  private possibleQueries!: {
    tipo: string;
    cidadeId: string;
    bairroId: string;
    valorMinimo: string;
    valorMaximo: string;
    areaMinima: string;
    areaMaxima: string;
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

  public get typeIsLoteamento(): boolean {
    return this.controlTipo?.value === AnnouncementTypeEnum.Loteamento;
  }

  constructor(
    private readonly formBuilder: FormBuilder,
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
      areaMinima: [null],
      areaMaxima: [null],
      banheiros: [null],
      dormitorios: [null],
      vagasGaragem: [null]
    });

    this.subscription.add(this.form.get('cidadeId')?.valueChanges.subscribe(value => this.getDistricts(value)));
  }

  private setValueForm(queries: { [key: string]: string }) {
    if (Object.keys(queries).length) {
      this.possibleQueries = {
        tipo: queries['tipo'],
        cidadeId: queries['cidadeId'],
        bairroId: queries['bairroId'],
        valorMinimo: queries['valorMinimo'],
        valorMaximo: queries['valorMaximo'],
        areaMinima: queries['areaMinima'],
        areaMaxima: queries['areaMaxima'],
        banheiros: queries['banheiros'],
        dormitorios: queries['dormitorios'],
        vagasGaragem: queries['vagasGaragem']
      }
    }

    let type: AnnouncementTypeEnum = this.activatedRoute.snapshot.params['type'];
    if (type?.includes('&')) {
      type = type.split('&')[0] as AnnouncementTypeEnum;
    }
    if (type) {
      this.possibleQueries = {
        tipo: type,
        cidadeId: queries['cidadeId'],
        bairroId: queries['bairroId'],
        valorMinimo: queries['valorMinimo'],
        valorMaximo: queries['valorMaximo'],
        areaMinima: queries['areaMinima'],
        areaMaxima: queries['areaMaxima'],
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
        this.controlValorMinimo?.setValue(this.possibleQueries.valorMinimo);
        this.showFiltersAdvanced = true;
      }
      if (this.valueExist(this.possibleQueries.valorMaximo)) {
        this.controlValorMaximo?.setValue(this.possibleQueries.valorMaximo);
        this.showFiltersAdvanced = true;
      }
      if (this.valueExist(this.possibleQueries.areaMinima)) {
        this.controlAreaMinima?.setValue(this.possibleQueries.areaMinima);
        this.showFiltersAdvanced = true;
      }
      if (this.valueExist(this.possibleQueries.areaMaxima)) {
        this.controlAreaMaxima?.setValue(this.possibleQueries.areaMaxima);
        this.showFiltersAdvanced = true;
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

    this.districtGetAllService.queryFilterAdd({
      field: 'cidadeId',
      value: cityId
    });

    this.districtGetAllService
      .getAll()
      .pipe(take(1))
      .subscribe((districts) => {
        this.districts = districts;
        if (this.possibleQueries.bairroId) {
          setTimeout(() => this.controlBairro?.setValue(this.possibleQueries.bairroId), 0);
        }
      });
  }

  public toggleTypeFilter(): void {
    this.showFiltersAdvanced = !this.showFiltersAdvanced;
  }

  public resetAdvancedFilter(): void {
    this.form.reset();
  }

  public submit(): void {
    let queryParams = {};

    const fieldsRemoveR$ = ['valorMinimo', 'valorMaximo'];

    Object.keys(this.form.controls).forEach(field => {
      let value = this.form.get(field)?.value;
      if (fieldsRemoveR$.includes(field)) {
        value = StringUtil.removeSymbolCurrencyBr(value);
      }
      if (value && value !== 'null' && value !== null) {
        queryParams = { ...queryParams, [field]: value }
      }
    });

    this.router.navigate([ANNOUNCEMENT_CONFIG.pathFront], { queryParams  });
  }

}
