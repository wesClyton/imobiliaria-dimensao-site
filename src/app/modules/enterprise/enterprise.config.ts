import { environment } from '../../../environments/environment';
import { ModuleConfig } from '../../shared/interfaces/module-config.interface';

const PATH: string = 'empreendimentos';

export const ENTERPRISE_CONFIG: ModuleConfig = {
  name: 'Empreendimento',
  namePlural: 'Empreendimentos',
  path: PATH,
  pathApiSingle: `${environment.api}/empreendimento`,
  pathApiPlural: `${environment.api}/empreendimentos`,
  pathFront: `/${PATH}`
};
