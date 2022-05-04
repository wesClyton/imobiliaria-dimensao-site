import { Observable } from 'rxjs';

export interface HttpGetById<GetById> {
  getById(id: string): Observable<GetById>;
}
