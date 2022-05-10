import { AnnouncementType as AnnouncementTypeEnum } from '../enums/announcement-type.enum';

export interface AnnouncementType {
  readonly name: string;
  readonly value: AnnouncementTypeEnum;
}
