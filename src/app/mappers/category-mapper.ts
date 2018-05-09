import { Category } from './../models/category';
import { IMapper } from './imapper';
import { DataSnapshot } from '@firebase/database-types';
import { AngularFireAction } from 'angularfire2/database';

export class CategoryMapper implements IMapper<Category> {
    toModel(action: AngularFireAction<DataSnapshot>): Category {
        const cate: Category = {
            id: action.key,
            name: action.payload.val().name
          };
          return cate;
    }
}
