import { Injectable } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { NotificationService } from '../../../core/notification/notification.service';

@Injectable({
  providedIn: 'root'
})
export class FormService {

  constructor(
    private readonly notificationService: NotificationService
  ) { }

  public validate(form: UntypedFormGroup, messageWarning: string = 'Verifique o formulário!'): void {
    this.notificationService.warning(messageWarning);

    Object.keys(form.controls).forEach(field => {
      const control = form.get(field);
      if (control instanceof UntypedFormControl) {
        control.markAsDirty();
        control.markAsTouched();
      } else if (control instanceof UntypedFormGroup) {
        this.validate(control);
      }
    });
  }

}
