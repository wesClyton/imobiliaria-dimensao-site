import { NgModule } from '@angular/core';
import { CoreComponentsModule } from './components/core-components.module';
import { LoadingModule } from './loading/loading.module';
import { NotificationModule } from './notification/notification.module';

@NgModule({
  imports: [
    CoreComponentsModule,
    NotificationModule,
    LoadingModule
  ],
  exports: [
    CoreComponentsModule,
    NotificationModule,
    LoadingModule
  ]
})
export class CoreModule { }
