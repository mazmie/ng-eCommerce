import { CartItem } from './../models/cart-item';
import { Injectable } from '@angular/core';
import { IMapper } from './imapper';
import { DataSnapshot } from '@firebase/database-types';
import { AngularFireAction } from 'angularfire2/database';
import { ShoppingCart } from '../models/shopping-cart';

@Injectable()
export class ShoppingCartMapper implements IMapper<ShoppingCart> {
    toModel(action: AngularFireAction<DataSnapshot>): ShoppingCart {
        if (!action || !action.payload.val()) { return null; }

        const itemsArray: CartItem[] = [];
        const itemsObject = action.payload.val().items;
        if (itemsObject) { 
            for (const productId of Object.keys(itemsObject)) {
                const item = itemsObject[productId] as CartItem;
                itemsArray.push(item);
              }
         }
        
        const cate = new ShoppingCart(action.key, 
            itemsArray,
            action.payload.val().dateCreated);
          return cate;
    }
}
