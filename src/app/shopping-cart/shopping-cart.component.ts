import { ShoppingCartService } from './../shopping-cart.service';
import { CartItem } from './../models/cart-item';
import { Product } from './../models/product';
import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';

@Component({
  selector: 'shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {

  total = 0;
  items: CartItem[] = [];

  constructor(private shoppingCartService: ShoppingCartService) {
  }

  clearShoppingCart() {
    this.shoppingCartService.removeItems();
  }
  async ngOnInit() {
    (await this.shoppingCartService.getCart())
      .subscribe(cart => {
        this.items = [];
        this.total = 0;
        if (!cart.items) { return; }
        for (const productId of Object.keys(cart.items)) {
          const item = cart.items[productId] as CartItem;
          this.total += item.product.price * item.quantity;
          this.items.push(item);
        }
      });
  }

}
