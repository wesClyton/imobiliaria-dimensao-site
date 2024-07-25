import { Component, OnInit } from '@angular/core';
import { AbstractControl, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { finalize, take } from 'rxjs';
import { LoadingService } from '../../core/loading/loading.service';
import { NotificationService } from '../../core/notification/notification.service';
import { FormService } from '../../shared/services/form/form.service';
import { MetaTagService } from '../../shared/services/meta-tag/meta-tag.service';
import { AnnouncementType } from '../announcement/interfaces/announcement-type.interface';
import { LeadType } from '../lead/enums/lead-type.enum';
import { AnnounceFormService } from './announce-form.service';
import { AnnounceLead } from './announce-lead.interface';

@Component({
  selector: 'app-announce',
  templateUrl: 'announce.component.html',
  styleUrls: ['announce.component.scss']
})
export class AnnounceComponent implements OnInit {

  public form!: UntypedFormGroup;

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

  public get title(): string {
    return 'Por que anunciar conosco?';
  }

  constructor(
    private readonly formBuilder: UntypedFormBuilder,
    private readonly formService: FormService,
    private readonly announceFormService: AnnounceFormService,
    private readonly loadingService: LoadingService,
    private readonly notificationService: NotificationService,
    private readonly metaTagService: MetaTagService,
  ) { }

  ngOnInit(): void {
    this.metaTagService.update({
      title: this.title
    });

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
    if (this.form.invalid) {
      this.formService.validate(this.form);
      return;
    }

    this.loadingService.show();

    const lead: AnnounceLead = {
      email: this.controlEmail?.value,
      nome: this.controlNome?.value,
      telefone: this.controlTelefone?.value,
      tipoForm: LeadType.Anuncie,
      tipoImovel: this.controlTipoImovel?.value,
      id: "form_anuncie"
    }

    this.announceFormService
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
