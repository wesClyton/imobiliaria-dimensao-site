import { Component, ElementRef, HostListener, OnDestroy, OnInit, Renderer2, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, NavigationStart, Router } from '@angular/router';
import { finalize, Subscription, take } from 'rxjs';
import { LoadingService } from '../../../../core/loading/loading.service';
import { FormService } from '../../../../shared/services/form/form.service';
import { CharacteristicType } from '../../../characteristic/enums/characteristic-type.enum';
import { Characteristic } from '../../../characteristic/interfaces/characteristic.interface';
import { Announcement } from '../../interfaces/announcement.interface';
import { AnnouncementGetAllService } from '../../services/announcement-get-all.service';
import { AnnouncementGetByIdService } from '../../services/announcement-get-by-id.service';

@Component({
  selector: 'app-announcement-detail',
  templateUrl: 'announcement-detail.component.html',
  styleUrls: ['announcement-detail.component.scss']
})
export class AnnouncementDetailComponent implements OnInit, OnDestroy {

  public showModal = false;

  public announcement!: Announcement;

  private announcementId!: string;

  public announcements!: Array<Announcement>;

  public characteristicsImovel!: Array<Characteristic>;

  public characteristicsInstalacoes!: Array<Characteristic>;

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

  private subscription = new Subscription();

  @ViewChild('grid1', { static: false })
  private grid1!: ElementRef<HTMLDivElement>;

  @ViewChild('boxForm', { static: false })
  private boxForm!: ElementRef<HTMLDivElement>;

  private grid1TopInitial!: number;

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly router: Router,
    private readonly announcementGetByIdService: AnnouncementGetByIdService,
    private readonly announcementGetAllService: AnnouncementGetAllService,
    private readonly loadingService: LoadingService,
    private readonly formBuilder: FormBuilder,
    private readonly formService: FormService,
    private readonly renderer: Renderer2
  ) {
    this.setAnnouncement();
  }

  ngOnInit(): void {
    this.createForm();

    this.subscription.add(
      this.router.events.subscribe((event: any) => {
        if (event instanceof NavigationStart) {
          this.setAnnouncement();
          this.getAnnouncements();
        }
      })
    );

    this.init();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  @HostListener('window:scroll', ['$event'])
  private onScroll(event: any): void {
    this.renderer.removeStyle(this.boxForm.nativeElement, 'transform');
    if (window.screen.availWidth >= 991.98) {
      const heightHeader = (document.getElementById('main-header') as HTMLElement).clientHeight;
      const scrollTop = event.srcElement.scrollingElement.scrollTop;
      const scrollTopWithHeightHeader = scrollTop + heightHeader;

      if (this.grid1TopInitial && (scrollTopWithHeightHeader >= this.grid1TopInitial)) {
        this.renderer.setStyle(this.boxForm.nativeElement, 'transform', `translateY(${scrollTopWithHeightHeader - this.grid1TopInitial}px)`);
      }
    }
  }

  private setAnnouncement(): void {
    const state: { [k: string]: Announcement } | undefined = this.router.getCurrentNavigation()?.extras?.state;
    if (state && state['announcement']) {
      this.announcement = state['announcement'];
      if (!this.grid1TopInitial) {
        this.setInitialGrid1Top();
      }
    }
    if (!this.announcement) {
      this.loadingService.show();
    }
  }

  private createForm(): void {
    this.form = this.formBuilder.group({
      nome: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.email]],
      telefone: [null, [Validators.required]]
    });
  }

  private init(): void {
    if (this.announcement) {
      this.getAnnouncements();
      this.filterCharacteristics();
      return;
    }

    this.announcementId = this.activatedRoute.snapshot.params['id'];
    this.getAnnouncement();
  }

  private getAnnouncement(): void {
    this.announcementGetByIdService
      .getById(this.announcementId)
      .pipe(
        take(1),
        finalize(() => this.loadingService.hide())
      )
      .subscribe(announcement => {
        this.announcement = announcement;
        this.filterCharacteristics();
        this.getAnnouncements();
        if (!this.grid1TopInitial) {
          this.setInitialGrid1Top();
        }
      });
  }

  private getAnnouncements(): void {
    this.announcements = new Array<Announcement>();
    this.announcementGetAllService.queryFilterRemove();

    this.announcementGetAllService.queryFilterAdd({
      field: 'tipo',
      value: this.announcement.tipo
    });

    this.announcementGetAllService
      .getAll()
      .pipe(take(1))
      .subscribe(announcements => {
        this.announcements = announcements.data.filter(announcement => announcement.id === this.announcement.id ? false : true).filter((announcement, index) => index < 3);
      });
  }

  private filterCharacteristics(): void {
    this.characteristicsImovel = this.announcement.caracteristicas.filter(characteristic => characteristic.tipo === CharacteristicType.Imovel);
    this.characteristicsInstalacoes = this.announcement.caracteristicas.filter(characteristic => characteristic.tipo === CharacteristicType.InstalacoesCondominio);
  }

  public submit(): void {
    if (this.form.invalid) {
      this.formService.validate(this.form);
      return;
    }
  }

  private setInitialGrid1Top(): void {
    setTimeout(() => this.grid1TopInitial = this.grid1.nativeElement.offsetTop, 500);
  }

  public openModal(): void {
    this.showModal = true;
  }

  public closeModal(): void {
    this.showModal = false;
  }

}
