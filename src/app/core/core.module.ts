import { NgModule } from '@angular/core';
import { CoreComponentsModule } from './components/core-components.module';
import { NotificationModule } from './notification/notification.module';

@NgModule({
  imports: [
    CoreComponentsModule,
    NotificationModule
  ],
  exports: [
    CoreComponentsModule,
    NotificationModule,
  ]
})
export class CoreModule { }
