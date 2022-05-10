import { State } from '../../state/interfaces/state.interface';

export interface City {
  readonly id: string;
  readonly nome: string;
  readonly estadoId: string;
  readonly estado: State;
}
