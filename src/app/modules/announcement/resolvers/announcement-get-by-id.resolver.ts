import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { finalize, switchMap, take } from 'rxjs/operators';
import { LoadingService } from '../../../core/loading/loading.service';
import { NotificationService } from '../../../core/notification/notification.service';
import { ANNOUNCEMENT_CONFIG } from '../announcement.config';
import { Announcement } from '../interfaces/announcement.interface';
import { AnnouncementGetByIdService } from '../services/announcement-get-by-id.service';
import { AnnouncementLinkUtil } from '../utils/announcement-link.util';

@Injectable({
  providedIn: 'root'
})
export class AnnouncementGeByIdResolver implements Resolve<Announcement | null> {

  constructor(
    private readonly loadingService: LoadingService,
    private readonly announcementGetByIdService: AnnouncementGetByIdService,
    private readonly router: Router,
    private readonly notificationService: NotificationService
  ) { }

  public resolve(activatedRouteSnapshot: ActivatedRouteSnapshot): Observable<Announcement | null> {
    const id: string = activatedRouteSnapshot.params['code'];
    this.loadingService.show();
    return this.announcementGetByIdService
      .getById(id)
      .pipe(
        take(1),
        switchMap(announcement => {
          if (!AnnouncementLinkUtil.canOpenAnnouncement(announcement)) {
            this.notificationService.information('Anúncio expirado ou inativo');
            this.router.navigateByUrl(ANNOUNCEMENT_CONFIG.pathFront);
            return of(null);
          }
          return of(announcement);
        }),
        finalize(() => this.loadingService.hide())
      );
  }

}
