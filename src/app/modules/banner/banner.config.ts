import { environment } from '../../../environments/environment';
import { ModuleConfig } from '../../shared/interfaces/module-config.interface';

const PATH: string = 'banners';

export const BANNER_CONFIG: ModuleConfig = {
  name: 'Banner',
  namePlural: 'Banners',
  path: PATH,
  pathApiSingle: `${environment.api}/banner`,
  pathApiPlural: `${environment.api}/banners`,
  pathFront: `/${PATH}`
};
