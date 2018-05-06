import { Component, OnInit, Input } from '@angular/core';
import { Product } from '../models/product';

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit {

  @Input('showActions') showActions: Boolean = false;
  @Input('product') product: Product;
  
  constructor() { }

  ngOnInit() {
  }

}
