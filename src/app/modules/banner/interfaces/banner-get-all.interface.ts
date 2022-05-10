import { ApiPagination } from '../../../shared/interfaces/api-pagination.interface';
import { Banner } from './banner.interface';

export interface BannerGetAll extends ApiPagination {
  readonly data: Array<Banner>;
}
