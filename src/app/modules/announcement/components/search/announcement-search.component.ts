import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { StringUtil } from '../../../../shared/utils/string.util';
import { CityGetAll } from '../../../city/interfaces/city-get-all.interface';
import { ANNOUNCEMENT_CONFIG } from '../../announcement.config';
import { AnnouncementType } from '../../interfaces/announcement-type.interface';

@Component({
  selector: 'app-announcement-search',
  templateUrl: 'announcement-search.component.html',
  styleUrls: ['announcement-search.component.scss']
})
export class AnnouncementSearchComponent implements OnInit {

  public form!: FormGroup;

  public quantities = new Array<string>('1', '2', '3', '4+');

  public showFiltersAdvanced = false;

  public announcementTypes!: Array<AnnouncementType>;

  public cities!: CityGetAll;

  private get controlTipo(): AbstractControl | null {
    return this.form.get('tipo');
  }

  private get controlCidade(): AbstractControl | null {
    return this.form.get('cidade');
  }

  private get controlBairro(): AbstractControl | null {
    return this.form.get('bairro');
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

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.createForm();
  }

  private createForm(): void {
    this.form = this.formBuilder.group({
      tipo: [null],
      cidade: [null],
      bairro: [null],
      valorMinimo: [null],
      valorMaximo: [null],
      areaMinima: [null],
      areaMaxima: [null],
      banheiros: [null],
      dormitorios: [null],
      vagasGaragem: [null]
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
