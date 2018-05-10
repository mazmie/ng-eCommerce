import { BaseService } from './base.service';
import { Category } from './models/category';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { CategoryMapper } from './mappers/category-mapper';

@Injectable()
export class CategoryService extends BaseService<Category> {

  constructor(db: AngularFireDatabase,
    mapper: CategoryMapper) {
    super('categories',
      mapper,
      db);
   }
   
}
