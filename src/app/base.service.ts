import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { PathReference, AngularFireDatabase } from 'angularfire2/database';
import { IMapper } from './mappers/imapper';

@Injectable()
export class BaseService<T> {

  private nodePath: PathReference;

  constructor(nodeName: String,
    private mapper: IMapper<T>, 
    protected db: AngularFireDatabase) {
    this.nodePath = '/' + nodeName;
   }

  save(target: T) {
    return this.db.list(this.nodePath).push(target);
  }

  update(id: String, target: T) {
    return this.db.object(this.nodePath + '/' + id).update(target);
  }

  remove(id: String) {
    return this.db.object(this.nodePath + '/' + id).remove();
  }

  listAll(): Observable<T[]>  {
    return this.db.list(this.nodePath).snapshotChanges()
    .map(items => items.map(x => {
      return this.mapper.toModel(x);
    }));
  }

  get(id: String): Observable<T> {
    return this.db.object(this.nodePath + '/' + id).snapshotChanges()
      .map(item => this.mapper.toModel(item));
  }

}
