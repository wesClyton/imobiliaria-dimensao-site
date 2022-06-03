import { Component, OnInit } from '@angular/core';
import { AbstractControl, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { finalize, take } from 'rxjs';
import { LoadingService } from '../../core/loading/loading.service';
import { NotificationService } from '../../core/notification/notification.service';
import { FormService } from '../../shared/services/form/form.service';
import { LeadType } from '../lead/enums/lead-type.enum';
import { ContactFormService } from './contact-form.service';
import { ContactLead } from './contact-lead.interface';

@Component({
  selector: 'app-contact',
  templateUrl: 'contact.component.html',
  styleUrls: ['contact.component.scss']
})
export class ContactComponent implements OnInit {

  public form!: UntypedFormGroup;

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
    return this.form.get('mensagem');
  }

  public get controlMensagemHasError(): boolean | undefined {
    return this.controlMensagem?.dirty && this.controlMensagem?.hasError('required');
  }

  public get controlConcordo(): AbstractControl | null {
    return this.form.get('concordo');
  }

  constructor(
    private readonly formBuilder: UntypedFormBuilder,
    private readonly formService: FormService,
    private readonly loadingService: LoadingService,
    private readonly contactFormService: ContactFormService,
    private readonly notificationService: NotificationService
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
    if (this.form.invalid) {
      this.formService.validate(this.form);
      return;
    }

    this.loadingService.show();

    const lead: ContactLead = {
      email: this.controlEmail?.value,
      nome: this.controlNome?.value,
      melhorHorario: this.controlMelhorHorario?.value,
      mensagem: this.controlMensagem?.value,
      telefone: this.controlTelefone?.value,
      tipoForm: LeadType.Contato
    }

    this.contactFormService
      .post(lead)
      .pipe(
        take(1),
        finalize(() => this.loadingService.hide())
      )
      .subscribe(() => {
        this.notificationService.success('Formulário enviado com sucesso!');
        this.form.reset();
      });
  }

}
