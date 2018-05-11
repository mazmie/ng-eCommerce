import { Subscription } from 'rxjs/Subscription';
import { ShoppingCartService } from './../shopping-cart.service';
import { CartItem } from './../models/cart-item';
import { Product } from './../models/product';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from '../product.service';
import { ShoppingCart } from '../models/shopping-cart';

@Component({
  selector: 'shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit, OnDestroy {

  cart: ShoppingCart = new ShoppingCart(null, [], new Date());
  cartSubscription: Subscription;

  constructor(private shoppingCartService: ShoppingCartService) {
  }

  clearShoppingCart() {
    this.shoppingCartService.removeItems();
  }
  async ngOnInit() {
    this.cartSubscription = (await this.shoppingCartService.getCart())
      .subscribe(cart => this.cart = cart);
  }

  ngOnDestroy(): void {
    this.cartSubscription.unsubscribe();
  }

}
