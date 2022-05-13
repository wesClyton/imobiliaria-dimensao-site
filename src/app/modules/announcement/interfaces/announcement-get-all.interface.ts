import { ApiPagination } from '../../../shared/interfaces/api-pagination.interface';
import { Announcement } from './announcement.interface';

export interface AnnouncementGetAll extends ApiPagination {
  readonly data: Array<Announcement>;
}
