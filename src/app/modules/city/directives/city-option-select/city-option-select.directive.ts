import { Directive, EventEmitter, OnInit, Output } from '@angular/core';
import { take } from 'rxjs/operators';
import { CityGetAll } from '../../interfaces/city-get-all.interface';
import { CityGetAllService } from '../../services/city-get-all.service';

@Directive({
  selector: '[appCityOptionSelect]'
})
export class CityOptionSelectDirective implements OnInit {

  @Output()
  public readonly dataFinded = new EventEmitter<CityGetAll>();

  constructor(
    private readonly cityService: CityGetAllService
  ) { }

  ngOnInit(): void {
    this.cityService.getAll().pipe(take(1)).subscribe(cities => this.dataFinded.next(cities));
  }

}
