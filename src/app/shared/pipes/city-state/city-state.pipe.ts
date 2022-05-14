import { Pipe, PipeTransform } from '@angular/core';
import { City } from '../../../modules/city/interfaces/city.interface';

@Pipe({
  name: 'cityState'
})
export class CityStatePipe implements PipeTransform {

  transform(city: City): string {
    return `${city.nome}-${city.estado.uf}`;
  }

}
