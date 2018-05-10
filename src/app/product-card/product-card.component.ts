import { Component, Input } from '@angular/core';
import { Product } from '../models/product';
import { ShoppingCart } from '../models/shopping-cart';

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent {

  @Input('showActions') showActions: Boolean = false;
  @Input('product') product: Product;
  @Input('cart') cart: ShoppingCart;

  constructor() {
  }

  getQuantity() {
    if (!this.cart || !this.cart.items) { return 0; }
    const item = this.cart.items[this.product.id];
    return item ? item.quantity : 0;
  }

}
