import { Category } from './models/category';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';

@Injectable()
export class CategoryService {

  constructor(private db: AngularFireDatabase) { }

  listAll() {
    return this.db.list('/categories')
      .snapshotChanges()
      .map(items => items.map(x => {
        const cate: Category = {
          id: x.key,
          name: x.payload.val().name
        };
        return cate;
      }));
  }

}
