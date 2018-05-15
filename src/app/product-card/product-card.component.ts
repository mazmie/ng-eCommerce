import { Observable } from 'rxjs/Observable';
import { Component, Input, OnInit, OnDestroy } from '@angular/core';
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
  @Input('shopping-cart') cart: ShoppingCart;

  constructor() {  }

}
