import { Broker } from './broker.interface';

export interface BrokerGetAll {
  readonly data: Array<Broker>;
}