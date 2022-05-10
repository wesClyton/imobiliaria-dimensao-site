import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormService } from '../../shared/services/form/form.service';
import { AnnouncementType } from '../announcement/interfaces/announcement-type.interface';

@Component({
  selector: 'app-announce',
  templateUrl: 'announce.component.html',
  styleUrls: ['announce.component.scss']
})
export class AnnounceComponent implements OnInit {

  public form!: FormGroup;

  public announcementTypes!: Array<AnnouncementType>;

  private get controlNome(): AbstractControl | null {
    return this.form.get('nome');
  }

  public get controlNomeHasError(): boolean | undefined {
    return this.controlNome?.dirty && this.controlNome?.hasError('required');
  }

  private get controlEmail(): AbstractControl | null {
    return this.form.get('email');
  }

  public get controlEmailHasError(): boolean | undefined {
    return this.controlEmail?.dirty && (this.controlEmail?.hasError('required') || this.controlEmail?.hasError('email'));
  }

  private get controlTelefone(): AbstractControl | null {
    return this.form.get('telefone');
  }

  public get controlTelefoneHasError(): boolean | undefined {
    return this.controlTelefone?.dirty && this.controlTelefone?.hasError('required');
  }

  private get controlTipoImovel(): AbstractControl | null {
    return this.form.get('tipoImovel');
  }

  public get controlTipoImovelHasError(): boolean | undefined {
    return this.controlTipoImovel?.dirty && this.controlTipoImovel?.hasError('required');
  }

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly formService: FormService
  ) { }

  ngOnInit(): void {
    this.createForm();
  }

  private createForm(): void {
    this.form = this.formBuilder.group({
      nome: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.email]],
      telefone: [null, [Validators.required]],
      tipoImovel: [null, [Validators.required]],
    });
  }

  public submit(): void {
    console.log('submit')
    if (this.form.invalid) {
      this.formService.validade(this.form);
      return;
    }
  }

}
