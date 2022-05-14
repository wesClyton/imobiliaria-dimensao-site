import { Announcement } from '../announcement/interfaces/announcement.interface';

export interface Marker {
  position: {
    lat: number;
    lng: number;
  },
  announcement: Announcement;
}
