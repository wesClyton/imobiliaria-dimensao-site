import { ApiPagination } from '../../../shared/interfaces/api-pagination.interface';
import { City } from './city.interface';

export interface CityGetAll extends ApiPagination {
  readonly data: Array<City>;
}
