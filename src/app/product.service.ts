import { IMapper } from './mappers/imapper';
import { BaseService } from './base.service';
import { Category } from './models/category';
import { Injectable } from '@angular/core';
import { Product } from './models/product';
import { AngularFireDatabase, AngularFireAction } from 'angularfire2/database';
import { DataSnapshot } from '@firebase/database-types';
import { ProductMapper } from './mappers/product-mapper';

@Injectable()
export class ProductService extends BaseService<Product> {

  constructor(db: AngularFireDatabase, 
    mapper: ProductMapper) {
    super('products',
      mapper,
      db);
   }

}
