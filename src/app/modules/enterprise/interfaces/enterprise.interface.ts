import { City } from "../../city/interfaces/city.interface";

export interface Enterprise {
  readonly id: string;
  readonly cidade: City;
  readonly nome: string;
  readonly descricao: string;
  readonly link: string;
  readonly foto: string;
  readonly ativo: boolean;
}