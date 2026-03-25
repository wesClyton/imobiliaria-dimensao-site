import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, Input, PLATFORM_ID } from '@angular/core';

@Component({
  selector: 'app-button-whatsapp',
  templateUrl: 'button-whatsapp.component.html',
  styleUrls: ['button-whatsapp.component.scss']
})
export class ButtonWhatsappComponent {

  @Input()
  public number!: string | undefined;

  @Input()
  public message = 'Olá, vim através do site.';

  constructor(@Inject(PLATFORM_ID) private readonly platformId: Object) { }

  public openWhatsapp(): void {
    if (this.number && isPlatformBrowser(this.platformId)) {
      this.number = '55' + this.number.replace(/\D/g, '');
      window.open(`https://api.whatsapp.com/send?phone=${this.number}&text=${this.message}`, '_blank')
    }
  }

}
