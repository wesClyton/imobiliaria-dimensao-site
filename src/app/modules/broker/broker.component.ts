import { Component } from '@angular/core';
import { Broker } from './interfaces/broker.interface';

@Component({
  selector: 'app-broker',
  templateUrl: 'broker.component.html',
  styleUrls: ['broker.component.scss']
})
export class BrokerComponent {

  public brokers: Array<Broker> = [
    {
      ativo: true,
      biografia: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s',
      creci: '',
      email: 'email@email.com',
      facebook: '',
      foto: 'assets/api/corretor.jpg',
      funcao: 'Corretor',
      id: 'aaa-bbb',
      instagram: '',
      linkedin: '',
      nome: 'ANDRE ROSA',
      telefone: '(44) 9 9999-9999',
      whatsapp: '(44) 9 9999-9999'
    },
    {
      ativo: true,
      biografia: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s',
      creci: 'CRECI-PR F37044',
      email: 'email@email.com',
      facebook: 'aaa',
      foto: 'assets/api/corretor.jpg',
      funcao: 'Corretor',
      id: 'aaa-bbb',
      instagram: 'aaa',
      linkedin: 'aaa',
      nome: 'ANDRE ROSA',
      telefone: '(44) 9 9999-9999',
      whatsapp: '(44) 9 9999-9999'
    },
    {
      ativo: true,
      biografia: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s',
      creci: 'CRECI-PR F37044',
      email: 'email@email.com',
      facebook: '',
      foto: 'assets/api/corretor.jpg',
      funcao: 'Corretor',
      id: 'aaa-bbb',
      instagram: '',
      linkedin: '',
      nome: 'ANDRE ROSA',
      telefone: '(44) 9 9999-9999',
      whatsapp: '(44) 9 9999-9999'
    },
    {
      ativo: true,
      biografia: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s',
      creci: 'CRECI-PR F37044',
      email: 'email@email.com',
      facebook: '',
      foto: 'assets/api/corretor.jpg',
      funcao: 'Corretor',
      id: 'aaa-bbb',
      instagram: '',
      linkedin: '',
      nome: 'ANDRE ROSA',
      telefone: '(44) 9 9999-9999',
      whatsapp: '(44) 9 9999-9999'
    },
    {
      ativo: true,
      biografia: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s',
      creci: '',
      email: 'email@email.com',
      facebook: '',
      foto: 'assets/api/corretor.jpg',
      funcao: 'Corretor',
      id: 'aaa-bbb',
      instagram: '',
      linkedin: '',
      nome: 'ANDRE ROSA',
      telefone: '(44) 9 9999-9999',
      whatsapp: '(44) 9 9999-9999'
    },
    {
      ativo: true,
      biografia: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s',
      creci: 'CRECI-PR F37044',
      email: 'email@email.com',
      facebook: '',
      foto: 'assets/api/corretor.jpg',
      funcao: 'Corretor',
      id: 'aaa-bbb',
      instagram: '',
      linkedin: '',
      nome: 'ANDRE ROSA',
      telefone: '(44) 9 9999-9999',
      whatsapp: '(44) 9 9999-9999'
    }
  ];

  broker!: Broker | null;

  openModal (broker: Broker) {
    this.broker = broker;
  }

  closeModal () {
    this.broker = null;
  }

  constructor() { }

}
