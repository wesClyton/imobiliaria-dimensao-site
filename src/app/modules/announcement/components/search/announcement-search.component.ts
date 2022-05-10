import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';
import { CityGetAll } from '../../../city/interfaces/city-get-all.interface';
import { AnnouncementSearchQuantitiesTypeEnum } from '../../enums/announcement-search-quantities-type.enum';
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

  private get controlMinimo(): AbstractControl | null {
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

  public get controlVagas(): AbstractControl | null {
    return this.form.get('vagas');
  }

  constructor(
    private readonly formBuilder: FormBuilder
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
      vagas: [null]
    });
  }

  public toggleTypeFilter(): void {
    this.showFiltersAdvanced = !this.showFiltersAdvanced;
    this.resetAdvancedFilter();
  }

  private resetAdvancedFilter(): void {
    this.controlBanheiros?.reset();
    this.controlDormitorios?.reset();
    this.controlVagas?.reset();
  }

  public submit(): void {
    console.log(this.form.value)
  }

  public quantitiesSelect(type: AnnouncementSearchQuantitiesTypeEnum, quantity: string): void {}

}
