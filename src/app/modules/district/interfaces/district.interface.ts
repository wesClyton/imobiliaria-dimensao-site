import { City } from '../../city/interfaces/city.interface';

export interface District {
  readonly id: string;
  readonly nome: string;
  readonly cidadeId: string;
  readonly cidade: City;
}
