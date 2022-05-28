import { Observable } from 'rxjs';

export interface HttpPost<PostIn, PostOut> {
  post(type: PostIn): Observable<PostOut>;
}
