import { CartItem } from './../models/cart-item';
import { Product } from './../models/product';
import { Injectable } from '@angular/core';
import { IMapper } from './imapper';
import { DataSnapshot } from '@firebase/database-types';
import { AngularFireAction } from 'angularfire2/database';
import { ShoppingCart } from '../models/shopping-cart';

@Injectable()
export class CartItemMapper implements IMapper<CartItem> {
    toModel(action: AngularFireAction<DataSnapshot>): CartItem {
        if (!action || !action.payload.val()) { return null; }
        const item = new CartItem(action.payload.val().product, 
            action.payload.val().quantity); 
        return item;
    }
}
