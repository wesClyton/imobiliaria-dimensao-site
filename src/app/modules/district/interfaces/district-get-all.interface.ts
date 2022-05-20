import { ApiPagination } from '../../../shared/interfaces/api-pagination.interface';
import { District } from './district.interface';

export interface DistrictGetAll extends ApiPagination {
  readonly data: Array<District>;
}
