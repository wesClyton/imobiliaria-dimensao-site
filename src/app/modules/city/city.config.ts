import { environment } from '../../../environments/environment';
import { ModuleConfig } from '../../shared/interfaces/module-config.interface';

const PATH: string = 'cities';

export const CITY_CONFIG: ModuleConfig = {
  name: 'Cidade',
  namePlural: 'Cidades',
  path: PATH,
  pathApiSingle: `${environment.api}/cidade`,
  pathApiPlural: `${environment.api}/cidades`,
  pathFront: `/${PATH}`
};
