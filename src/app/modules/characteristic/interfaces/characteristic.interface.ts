import { CharacteristicType } from '../enums/characteristic-type.enum';

export interface Characteristic {
  readonly id: string;
  readonly nome: string;
  readonly tipo: CharacteristicType;
}
