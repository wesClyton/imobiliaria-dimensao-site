import { environment } from '../../../environments/environment';
import { ModuleConfig } from '../../shared/interfaces/module-config.interface';

const PATH: string = 'districts';

export const DISTRICT_CONFIG: ModuleConfig = {
  name: 'Bairro',
  namePlural: 'Bairros',
  path: PATH,
  pathApiSingle: `${environment.api}/bairro`,
  pathApiPlural: `${environment.api}/bairros`,
  pathFront: `/${PATH}`
};
