import { Observable } from 'rxjs';

export interface HttpGetAll<GetAll> {
  getAll(): Observable<GetAll>;
}
