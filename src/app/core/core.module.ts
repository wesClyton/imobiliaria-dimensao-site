import { NgModule } from '@angular/core';
import { CoreComponentsModule } from './components/core-components.module';

@NgModule({
  imports: [CoreComponentsModule],
  exports: [CoreComponentsModule]
})
export class CoreModule { }
