import { Component, OnInit, Input } from '@angular/core';
import { Product } from '../models/product';
import { ShoppingCartService } from '../shopping-cart.service';

@Component({
  selector: 'cart-item-actions',
  templateUrl: './cart-item-actions.component.html',
  styleUrls: ['./cart-item-actions.component.css']
})
export class CartItemActionsComponent implements OnInit {

  @Input('product') product: Product;
  @Input('quantity') quantity;
  
  constructor(private shoppingCartService: ShoppingCartService) {
  }

  addItem() {
    this.shoppingCartService.addToCart(this.product).then(response => this.quantity += 1);
  }

  removeItem() {
    this.shoppingCartService.removeFromCart(this.product).then(response => this.quantity -= 1);
  }

  ngOnInit() {
  }
}
