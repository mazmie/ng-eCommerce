import { Product } from './../../models/product';
import { ProductService } from './../../product.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import 'rxjs/add/operator/map';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit, OnDestroy {

  products: Product[] = [];
  productList: Product[] = [];
  subscribtion: Subscription;

  constructor(private productService: ProductService) {
    this.subscribtion = productService.listAll().subscribe(items =>
      this.productList = this.products = items.map(item => {
        const itemVal = item.payload.val();
        const product: Product = {
          id: item.key,
          title: itemVal.title,
          price: itemVal.price,
          category: itemVal.category,
          imageUrl: itemVal.imageUrl
        };
        return product;
      }));
  }

  filter(query: String) {
    this.productList = this.products.filter(x =>
      x.title.toLowerCase().includes(query.toLowerCase()));
  }

  ngOnDestroy() {
    this.subscribtion.unsubscribe();
  }

  ngOnInit() {
  }

}
