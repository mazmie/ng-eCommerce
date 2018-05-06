import { Category } from './models/category';
import { Injectable } from '@angular/core';
import { Product } from './models/product';
import { AngularFireDatabase } from 'angularfire2/database';

@Injectable()
export class ProductService {

  constructor(private db: AngularFireDatabase) { }

  save(product: Product) {
    this.db.list('/products').push(product);
  }

  update(id: String, product: Product) {
    return this.db.object('/products/' + id).update(product);
  }

  remove(id: String) {
    return this.db.object('/products/' + id).remove();
  }

  listAll() {
    return this.db.list('/products').snapshotChanges()
    .map(items => items.map(x => {
      const payloadValue = x.payload.val();
      const product: Product = {
        id: x.key,
        title: payloadValue.title,
        imageUrl: payloadValue.imageUrl,
        price: payloadValue.price,
        category: payloadValue.category
      };
      return product;
    }));
  }

  list() {
    return this.db.list('/products').snapshotChanges()
    .map(items => items.map(x => {
      const payloadValue = x.payload.val();
      const product: Product = {
        id: x.key,
        title: payloadValue.title,
        imageUrl: payloadValue.imageUrl,
        price: payloadValue.price,
        category: payloadValue.category
      };
      return product;
    }));
  }

  get(id: String) {
    return this.db.object('/products/' + id).valueChanges();
  }

}
