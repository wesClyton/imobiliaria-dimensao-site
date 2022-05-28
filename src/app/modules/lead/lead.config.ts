import { environment } from '../../../environments/environment';
import { ModuleConfig } from '../../shared/interfaces/module-config.interface';

const PATH: string = 'leads';

export const LEAD_CONFIG: ModuleConfig = {
  name: 'Lead',
  namePlural: 'Leads',
  path: PATH,
  pathApiSingle: `${environment.api}/lead`,
  pathApiPlural: `${environment.api}/leads`,
  pathFront: `/${PATH}`
};
