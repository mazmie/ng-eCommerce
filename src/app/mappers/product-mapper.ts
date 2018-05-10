import { ImplicitReceiver } from '@angular/compiler';
import { IMapper } from './imapper';
import { Product } from '../models/product';
import { AngularFireAction } from 'angularfire2/database';
import { DataSnapshot } from '@firebase/database-types';
import { Injectable } from '@angular/core';

@Injectable()
export class ProductMapper implements IMapper<Product> {
    toModel(action: AngularFireAction<DataSnapshot>): Product {
        if (!action || !action.payload.val()) { return null; }
        const payloadValue = action.payload.val();
        const product: Product = {
            id: action.key,
            title: payloadValue.title,
            imageUrl: payloadValue.imageUrl,
            price: payloadValue.price,
            category: payloadValue.category };
            return product;
    }
}
