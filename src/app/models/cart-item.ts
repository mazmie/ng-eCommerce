import { Product } from './product';

export class CartItem {
    constructor(product: Product, 
        quantity: number) {
        this.product = product;
        this.quantity = quantity;
    }

    product: Product;
    quantity: number;

    get totalPrice() {
        return this.product ? 
            this.product.price * this.quantity :
            0;
    }
}
