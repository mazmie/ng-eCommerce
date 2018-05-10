import { Injectable } from '@angular/core';
import { IMapper } from './imapper';
import { DataSnapshot } from '@firebase/database-types';
import { AngularFireAction } from 'angularfire2/database';
import { ShoppingCart } from '../models/shopping-cart';

@Injectable()
export class ShoppingCartMapper implements IMapper<ShoppingCart> {
    toModel(action: AngularFireAction<DataSnapshot>): ShoppingCart {
        if (!action || !action.payload.val()) { return null; }
        const cate: ShoppingCart = {
            id: action.key,
            items: action.payload.val().items,
            dateCreated: action.payload.val().dateCreated
          };
          return cate;
    }
}
