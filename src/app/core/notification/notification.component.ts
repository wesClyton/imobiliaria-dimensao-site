import { Component, Inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';
import { NotificationData } from './notification-data.interface';
import { NotificationType } from './notification-type.enum';

@Component({
  selector: 'app-notification-component',
  template: `
    <div class="content">
      <mat-icon>{{ icon }}</mat-icon>
      {{ message }}
    </div>
  `,
  styles: [`
    mat-icon {
      margin-right: 0.5rem;
    }
    .content {
      display: flex;
      align-items: center;
    }
  `]
})
export class NotificationComponent {

  public get message(): string {
    return this.data.message;
  }

  public get icon(): string {
    switch (this.data.type) {
      case NotificationType.Error:
        return 'cancel';

      case NotificationType.Information:
        return 'info';

      case NotificationType.Success:
        return 'check_circle';

      case NotificationType.Warning:
        return 'report';
    }
  }

  constructor(
    @Inject(MAT_SNACK_BAR_DATA) public data: NotificationData
  ) { }

}
