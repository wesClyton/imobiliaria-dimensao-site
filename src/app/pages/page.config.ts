import { ModuleConfig } from '../shared/interfaces/module-config.interface';

const PATH: string = 'page';

export const PAGES_CONFIG: ModuleConfig = {
  name: 'Page',
  namePlural: 'Pages',
  path: PATH,
  pathApiSingle: '',
  pathApiPlural: '',
  pathFront: `/${PATH}`
};
