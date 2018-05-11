import { CartItem } from './cart-item';

export class ShoppingCart {

    constructor(id: string, 
        items: CartItem[],
        dateCreated: Date) {
        this.id = id;
        this.items = items;
        this.dateCreated = dateCreated;
    }

    id: string;
    items: CartItem[];
    dateCreated: Date;

    get itemsCount() {
        let count = 0;
        for (const item of this.items) {
            count += item.quantity;
        }
        return count;
    }

    get totalPrice() {
        let price = 0;
        for (const item of this.items) {
            price += item.quantity * item.product.price;
        }
        return price;
    }
}
