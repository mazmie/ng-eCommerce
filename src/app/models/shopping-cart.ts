import { CartItem } from './cart-item';

export interface ShoppingCart {
    id: string;
    items: CartItem[];
    dateCreated: Date;
}
