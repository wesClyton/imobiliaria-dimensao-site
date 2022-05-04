import { TypeORMError } from '../enums/type-orm-error.enum';

export interface ApiError {
  readonly constraints: {
    readonly [key in TypeORMError]?: string;
  };
  readonly property: string;
  readonly value: string;
}
