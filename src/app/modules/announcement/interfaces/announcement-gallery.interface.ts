import { AnnouncementPhoto } from './announcement-photo.interface';

export interface AnnouncementGallery {
  readonly id: string;
  readonly fotos: Array<AnnouncementPhoto>;
}
