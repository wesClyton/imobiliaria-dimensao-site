import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { NotificationData } from './notification-data.interface';
import { NotificationType } from './notification-type.enum';
import { NotificationComponent } from './notification.component';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  private readonly durationInitial: number = 8000;

  constructor(
    private readonly matSnackBar: MatSnackBar
  ) { }

  public error(message: string): void {
    this.open(NotificationType.Error, message, { });
  }

  public information(message: string): void {
    this.open(NotificationType.Information, message, { });
  }

  public success(message: string): void {
    this.open(NotificationType.Success, message, { });
  }

  public warning(message: string): void {
    this.open(NotificationType.Warning, message, { });
  }

  private open(type: NotificationType, message: string, config: MatSnackBarConfig): void {
    config.duration = config.duration ? config.duration : this.durationInitial;

    const notification: NotificationData = {
      message,
      type
    };
    config.data = notification;

    this.matSnackBar.openFromComponent(NotificationComponent, config);
  }

}
