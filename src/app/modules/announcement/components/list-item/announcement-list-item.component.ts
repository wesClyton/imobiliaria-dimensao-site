import { Component, Input } from '@angular/core';
import { Announcement } from '../../interfaces/announcement.interface';
import { AnnouncementLinkUtil } from '../../utils/announcement-link.util';

@Component({
  selector: 'app-announcement-list-item',
  templateUrl: 'announcement-list-item.component.html',
  styleUrls: ['announcement-list-item.component.scss']
})
export class AnnouncementListItemComponent {

  @Input()
  public announcement!: Announcement;

  public get link(): string {
    return AnnouncementLinkUtil.create(this.announcement);
  }

  constructor() { }

}
