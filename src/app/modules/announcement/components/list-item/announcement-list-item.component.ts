import { Component, Input } from '@angular/core';
import { AnnouncementAreaType } from '../../enums/announcement-area-type.enum';
import { AnnouncementType } from '../../enums/announcement-type.enum';
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

  public get showAreaType(): { [key in AnnouncementAreaType]: boolean } {
    return {
      CONSTRUIDA: (this.announcement.tipo !== AnnouncementType.TerrenoUrbano) && (this.announcement.tipo !== AnnouncementType.TerronoRural),
      TOTAL: (this.announcement.tipo === AnnouncementType.TerrenoUrbano) || (this.announcement.tipo === AnnouncementType.TerronoRural)
    }
  }

  constructor() { }

}
