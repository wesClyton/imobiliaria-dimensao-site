import { environment } from '../../../environments/environment';
import { ModuleConfig } from '../../shared/interfaces/module-config.interface';

const PATH: string = 'corretores';

export const BROKER_CONFIG: ModuleConfig = {
  name: 'Corretor',
  namePlural: 'Corretores',
  path: PATH,
  pathApiSingle: `${environment.api}/corretor`,
  pathApiPlural: `${environment.api}/corretores`,
  pathFront: `/${PATH}`
};
