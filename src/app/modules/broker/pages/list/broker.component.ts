import { Component, OnInit } from '@angular/core';
import { finalize, take } from 'rxjs';
import { LoadingService } from '../../../../core/loading/loading.service';
import { Broker } from '../../interfaces/broker.interface';
import { BrokerGetAllService } from '../../services/broker-get-all.service';

@Component({
  selector: 'app-broker',
  templateUrl: 'broker.component.html',
  styleUrls: ['broker.component.scss']
})
export class BrokerComponent implements OnInit {

  public brokers!: Array<Broker>;;

  broker!: Broker | null;

  openModal (broker: Broker) {
    this.broker = broker;
  }

  closeModal () {
    this.broker = null;
  }

  constructor(
    private readonly brokerGetAllService: BrokerGetAllService,
    private readonly loadingService: LoadingService
  ) {
    this.loadingService.show();
  }

  ngOnInit(): void {
    this.getBrokers();
  }

  private getBrokers(): void {
    this.brokerGetAllService.queryFilterAdd({
      field: 'ativo',
      value: true
    });

    this.brokerGetAllService
      .getAll()
      .pipe(
        take(1),
        finalize(() => this.loadingService.hide())
      )
      .subscribe(brokers => this.brokers = brokers.data)
  }

}
