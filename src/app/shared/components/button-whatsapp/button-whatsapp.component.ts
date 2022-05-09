import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-button-whatsapp',
  templateUrl: 'button-whatsapp.component.html',
  styleUrls: ['button-whatsapp.component.scss']
})
export class ButtonWhatsappComponent {

  @Input() numeroWhats: any;

  constructor() { }

  openWhatsapp() {
    this.numeroWhats = this.numeroWhats.replace(/\D/g, '');
    window.open(`https://api.whatsapp.com/send?phone=+55${this.numeroWhats}`, '_blank');
  }

}
