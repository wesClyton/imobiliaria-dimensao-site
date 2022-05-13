import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { StringUtil } from '../../../../shared/utils/string.util';
import { ANNOUNCEMENT_CONFIG } from '../../announcement.config';
import { Announcement } from '../../interfaces/announcement.interface';

@Component({
  selector: 'app-announcement-list-item',
  templateUrl: 'announcement-list-item.component.html',
  styleUrls: ['announcement-list-item.component.scss']
})
export class AnnouncementListItemComponent {

  @Input()
  public announcement!: Announcement;

  constructor(
    private readonly router: Router
  ) { }

  public open(): void {
    this.router.navigate([`${ANNOUNCEMENT_CONFIG.pathFront}/${this.announcement.id}/${StringUtil.formatFriendlyUrl(this.announcement.titulo)}`]);
  }

}
