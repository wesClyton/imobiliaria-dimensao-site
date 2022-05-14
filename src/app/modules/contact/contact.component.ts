import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormService } from '../../shared/services/form/form.service';

@Component({
  selector: 'app-contact',
  templateUrl: 'contact.component.html',
  styleUrls: ['contact.component.scss']
})
export class ContactComponent implements OnInit {

  public form!: FormGroup;

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

  private get controlMelhorHorario(): AbstractControl | null {
    return this.form.get('melhorHorario');
  }

  private get controlMensagem(): AbstractControl | null {
    return this.form.get('melhorHorario');
  }

  public get controlMensagemHasError(): boolean | undefined {
    return this.controlMensagem?.dirty || this.controlMensagem?.hasError('required');
  }

  public get controlConcordo(): AbstractControl | null {
    return this.form.get('concordo');
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
      melhorHorario: [null],
      mensagem: [null, [Validators.required]],
      concordo: [null],
    });
  }

  public submit(): void {
    console.log('submit')
    if (this.form.invalid) {
      this.formService.validate(this.form);
      return;
    }
  }

}
