import { Category } from './../models/category';
import { IMapper } from './imapper';
import { DataSnapshot } from '@firebase/database-types';
import { AngularFireAction } from 'angularfire2/database';
import { Injectable } from '@angular/core';

@Injectable()
export class CategoryMapper implements IMapper<Category> {
    toModel(action: AngularFireAction<DataSnapshot>): Category {
        if (!action || !action.payload.val()) { return null; }
        const cate: Category = {
            id: action.key,
            name: action.payload.val().name
          };
          return cate;
    }
}
