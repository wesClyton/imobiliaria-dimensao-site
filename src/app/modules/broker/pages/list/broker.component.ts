import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BrokerGetAll } from '../../interfaces/broker-get-all.interface';
import { Broker } from '../../interfaces/broker.interface';

@Component({
  selector: 'app-broker',
  templateUrl: 'broker.component.html',
  styleUrls: ['broker.component.scss']
})
export class BrokerComponent implements OnInit {

  public brokers!: Array<Broker>;;

  public broker!: Broker | null;

  constructor(
    private readonly activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.brokers = (this.activatedRoute.snapshot.data['brokerGetAll'] as BrokerGetAll).data;
  }

  public openModal(broker: Broker): void {
    this.broker = broker;
  }

  public closeModal(): void {
    this.broker = null;
  }

}
