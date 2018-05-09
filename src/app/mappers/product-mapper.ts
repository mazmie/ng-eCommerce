import { ImplicitReceiver } from '@angular/compiler';
import { IMapper } from './i-mapper';
import { Product } from '../models/product';
import { AngularFireAction } from 'angularfire2/database';
import { DataSnapshot } from '@firebase/database-types';

export class ProductMapper implements IMapper<Product> {
    toModel(action: AngularFireAction<DataSnapshot>): Product {
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
