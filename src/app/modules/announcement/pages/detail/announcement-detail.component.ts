import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { finalize, Subscription, take } from 'rxjs';
import { LoadingService } from '../../../../core/loading/loading.service';
import { NotificationService } from '../../../../core/notification/notification.service';
import { PathImagePipe } from '../../../../shared/pipes/path-image/path-image.pipe';
import { FormService } from '../../../../shared/services/form/form.service';
import { MetaTagService } from '../../../../shared/services/meta-tag/meta-tag.service';
import { CharacteristicType } from '../../../characteristic/enums/characteristic-type.enum';
import { Characteristic } from '../../../characteristic/interfaces/characteristic.interface';
import { LeadType } from '../../../lead/enums/lead-type.enum';
import { ANNOUNCEMENT_CONFIG } from '../../announcement.config';
import { AnnouncementLead } from '../../interfaces/announcement-lead.interface';
import { Announcement } from '../../interfaces/announcement.interface';
import { AnnouncementFormService } from '../../services/announcement-form.service';
import { AnnouncementGetAllService } from '../../services/announcement-get-all.service';
import { AnnouncementGetByIdService } from '../../services/announcement-get-by-id.service';
import { AnnouncementLinkUtil } from '../../utils/announcement-link.util';

@Component({
  selector: 'app-announcement-detail',
  templateUrl: 'announcement-detail.component.html',
  styleUrls: ['announcement-detail.component.scss'],
  providers: [PathImagePipe]
})
export class AnnouncementDetailComponent implements OnInit, OnDestroy {

  public showModal = false;

  public announcement!: Announcement;

  public announcements!: Array<Announcement>;

  public characteristicsImovel!: Array<Characteristic>;

  public characteristicsInstalacoes!: Array<Characteristic>;

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

  public get messageWhats(): string {
    return `Olá, gostaria de mais informações sobre o imóvel ${this.announcement.codigoAnuncio}. ${location.href}`;
  }

  private announcementId!: string;

  private subscription = new Subscription();

  private get messageNotAnnouncement(): string {
    return 'Não foi possível encontrar o anúncio.';
  }

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly announcementGetAllService: AnnouncementGetAllService,
    private readonly loadingService: LoadingService,
    private readonly formBuilder: UntypedFormBuilder,
    private readonly formService: FormService,
    private readonly announcementFormService: AnnouncementFormService,
    private readonly notificationService: NotificationService,
    private readonly metaTagService: MetaTagService,
    private readonly pathImagePipe: PathImagePipe,
    private readonly router: Router,
    private readonly announcementGetByIdService: AnnouncementGetByIdService
  ) { }

  ngOnInit(): void {
    this.announcement = this.activatedRoute.snapshot.data['announcement'];
    if (!this.announcement) {
      this.notificationService.information(this.messageNotAnnouncement);
      this.router.navigateByUrl(ANNOUNCEMENT_CONFIG.pathFront);
      return;
    }

    this.subscription.add(
      this.router.events.subscribe((event: any) => {
        if (event instanceof NavigationEnd) {
          this.getAnnouncement();
          this.loadingService.show();
        }
      })
    );

    this.filterCharacteristics();
    this.getAnnouncements();

    this.metaTagService.update({
      title: this.announcement.titulo,
      image: this.pathImagePipe.transform(this.announcement.galeria.fotos[0].nome, 'anuncios', this.announcement.galeria.id) || '',
      description: this.announcement.sobre
    });

    this.createForm();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  private createForm(): void {
    this.form = this.formBuilder.group({
      nome: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.email]],
      telefone: [null, [Validators.required]]
    });
  }

  private getAnnouncements(): void {
    this.announcements = new Array<Announcement>();
    this.announcementGetAllService.queryFilterRemove();

    this.announcementGetAllService
      .getAll()
      .pipe(take(1))
      .subscribe(announcements => {
        this.announcements = announcements.data.filter(
          announcement => announcement.id === this.announcement.id ? false : true
        )
        .filter(announcement => announcement.tipo === this.announcement.tipo)
        .filter((announcement, index) => index < 3)
      });
  }

  private filterCharacteristics(): void {
    this.characteristicsImovel = this.announcement.caracteristicas.filter(characteristic => characteristic.tipo === CharacteristicType.Imovel);
    this.characteristicsInstalacoes = this.announcement.caracteristicas.filter(characteristic => characteristic.tipo === CharacteristicType.InstalacoesCondominio);
  }

  private getAnnouncement(): void {
    this.announcementId = (this.activatedRoute.snapshot.params['code'] as string).toUpperCase();

    if (!this.announcementId) {
      this.loadingService.hide();
      this.notificationService.error(this.messageNotAnnouncement);
      return;
    }

    this.announcementGetByIdService
      .getById(this.announcementId)
      .pipe(
        take(1),
        finalize(() => this.loadingService.hide())
      )
      .subscribe(announcement => {
        this.announcement = announcement;
        if (!AnnouncementLinkUtil.canOpenAnnouncement(this.announcement)) {
          this.notificationService.information('Anúncio expirado ou inativo');
          this.router.navigateByUrl(ANNOUNCEMENT_CONFIG.pathFront);
          return;
        }
        this.metaTagService.update({
          title: this.announcement.titulo,
          image: this.pathImagePipe.transform(this.announcement.galeria.fotos[0].nome, 'anuncios', this.announcement.galeria.id) || ''
        });
        this.filterCharacteristics();
        this.getAnnouncements();
      });
  }

  public submit(): void {
    if (this.form.invalid) {
      this.formService.validate(this.form);
      return;
    }

    this.loadingService.show();

    const lead: AnnouncementLead = {
      email: this.controlEmail?.value,
      nome: this.controlNome?.value,
      telefone: this.controlTelefone?.value,
      tipoForm: LeadType.Anuncio,
      codigoimovel: this.announcement.codigoAnuncio,
    }

    this.announcementFormService
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

  public toggleModal(): void {
    this.showModal = !this.showModal;
  }

}
