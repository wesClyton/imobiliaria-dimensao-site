import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { NotificationService } from '../../../core/notification/notification.service';

@Injectable({
  providedIn: 'root'
})
export class FormService {

  constructor(
    private readonly notificationService: NotificationService
  ) { }

  public validade(form: FormGroup, messageWarning: string = 'Verifique o formulário!'): void {
    this.notificationService.warning(messageWarning);

    Object.keys(form.controls).forEach(field => {
      const control = form.get(field);
      if (control instanceof FormControl) {
        control.markAsDirty();
        control.markAsTouched();
      } else if (control instanceof FormGroup) {
        this.validade(control);
      }
    });
  }

}
