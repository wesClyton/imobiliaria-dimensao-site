import { Component, Input } from '@angular/core';
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

  public get link(): string {
    return `${ANNOUNCEMENT_CONFIG.pathFront}/${StringUtil.formatFriendlyUrl(this.announcement.titulo)}/${this.announcement.id}`;
  }

  constructor() { }

}
