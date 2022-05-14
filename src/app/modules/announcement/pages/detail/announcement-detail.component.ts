import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize, take } from 'rxjs';
import { LoadingService } from '../../../../core/loading/loading.service';
import { Characteristic } from '../../../characteristic/interfaces/characteristic.interface';
import { Announcement } from '../../interfaces/announcement.interface';
import { AnnouncementGetAllService } from '../../services/announcement-get-all.service';
import { AnnouncementGetByIdService } from '../../services/announcement-get-by-id.service';

@Component({
  selector: 'app-announcement-detail',
  templateUrl: 'announcement-detail.component.html',
  styleUrls: ['announcement-detail.component.scss']
})
export class AnnouncementDetailComponent implements OnInit {

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

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly router: Router,
    private readonly announcementGetByIdService: AnnouncementGetByIdService,
    private readonly announcementGetAllService: AnnouncementGetAllService,
    private readonly loadingService: LoadingService,
    private readonly formBuilder: FormBuilder
  ) {
    const state: { [k: string]: Announcement } | undefined = this.router.getCurrentNavigation()?.extras?.state;
    if (state && state['announcement']) {
      this.announcement = state['announcement'];
    }
    if (!this.announcement) {
      this.loadingService.show();
    }
  }

  ngOnInit(): void {
    this.createForm();

    if (this.announcement) {
      return;
    }

    this.announcementId = this.activatedRoute.snapshot.params['id'];
    this.getAnnouncement();
    this.getAnnouncements();
  }

  private createForm(): void {
    this.form = this.formBuilder.group({
      nome: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.email]],
      telefone: [null, [Validators.required]]
    });
  }

  private getAnnouncement(): void {
    this.announcementGetByIdService
      .getById(this.announcementId)
      .pipe(
        take(1),
        finalize(() => this.loadingService.hide())
      )
      .subscribe(announcement => this.announcement = announcement);
  }

  private getAnnouncements(): void {
    this.announcementGetAllService
      .getAll()
      .pipe(take(1))
      .subscribe(announcements => this.announcements = announcements.data.filter((announcement, index) => index < 3));
  }

  public submit(): void {}

}
