import { AnnouncementStateProperty as AnnouncementStatePropertyEnum } from '../enums/announcement-state-property.enum';

export interface AnnouncementStateProperty {
  readonly name: string;
  readonly value: AnnouncementStatePropertyEnum;
}
