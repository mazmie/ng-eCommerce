import { Component, OnInit, OnDestroy } from '@angular/core';
import { ShippingInfo } from '../models/shipping-info';
import { ShoppingCart } from '../models/shopping-cart';
import { ShoppingCartService } from '../shopping-cart.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent implements OnInit, OnDestroy {

  shippingInfo: ShippingInfo = { name: '', line1: '', line2: '', city: '' };
  cart: ShoppingCart;
  cartSubscription: Subscription;
  
  constructor(private shoppingCartService: ShoppingCartService) { }

  async ngOnInit() {
    this.cartSubscription = (await this.shoppingCartService.getCart())
      .subscribe(cart => this.cart = cart);
  }

  ngOnDestroy(): void {
    this.cartSubscription.unsubscribe();
  }

}
