import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../product.service';
import { Router, ActivatedRoute } from '@angular/router';
import { CategoryService } from '../../category.service';
import { AngularFireList } from 'angularfire2/database';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {

  productId;
  product: any = {title: '', price: 0, category: '', imageUrl: ''};
  categories$;

  constructor(categoryService: CategoryService,
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute) {
    this.categories$ = categoryService.listAll();
    this.productId = this.route.snapshot.paramMap.get('id');
    if (this.productId) {
      const product = this.productService.get(this.productId).take(1).subscribe(x => this.product = x);
    }
   }

   save(product) {
    if (this.productId) {
     this.productService.update(this.productId, product);
    } else {
     this.productService.save(product);
    }
    this.router.navigateByUrl('/admin/products');
   }

   remove() {
    if (!confirm('Are you sure you want to delete this item?')) { return; }
    this.productService.remove(this.productId);
    this.router.navigateByUrl('/admin/products');
   }

  ngOnInit() {
  }

}
