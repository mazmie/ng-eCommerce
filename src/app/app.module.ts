import { ProductMapper } from './mappers/product-mapper';
import { CategoryMapper } from './mappers/category-mapper';
import { CategoryService } from './category.service';
import { AdminAuthGuard } from './admin-auth-guard.service';
import { AuthGuard } from './auth-guard.service';
import { AuthService } from './auth.service';
import { environment } from './../environments/environment';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { CheckOutComponent } from './check-out/check-out.component';
import { ProductsComponent } from './products/products.component';
import { OrderSuccessComponent } from './order-success/order-success.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { AdminProductsComponent } from './admin/admin-products/admin-products.component';
import { AdminOrdersComponent } from './admin/admin-orders/admin-orders.component';
import { LoginComponent } from './login/login.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { UserService } from './user.service';
import { FormsModule } from '@angular/forms';
import { ProductService } from './product.service';
import { ProductFormComponent } from './admin/product-form/product-form.component';
import { CustomFormsModule } from 'ng2-validation';
import { DataTableModule } from 'angular5-data-table';
import { ProductCardComponent } from './product-card/product-card.component';
import { ShoppingCartService } from './shopping-cart.service';
import { ShoppingCartMapper } from './mappers/shopping-cart-mapper';
import { CartItemMapper } from './mappers/cart-item-mapper';
import { CartItemActionsComponent } from './cart-item-actions/cart-item-actions.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    CheckOutComponent,
    ProductsComponent,
    OrderSuccessComponent,
    MyOrdersComponent,
    AdminProductsComponent,
    AdminOrdersComponent,
    LoginComponent,
    NotFoundComponent,
    ShoppingCartComponent,
    ProductFormComponent,
    ProductCardComponent,
    CartItemActionsComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    DataTableModule,
    NgbModule.forRoot(),
    RouterModule.forRoot([
      {path: '', component: ProductsComponent},
      {path: 'login', component: LoginComponent},
      {path: 'products', component: ProductsComponent},
      {path: 'shopping-cart', component: ShoppingCartComponent },
      
      {path: 'my-orders', component: MyOrdersComponent, canActivate: [AuthGuard]},
      {path: 'check-out', component: CheckOutComponent, canActivate: [AuthGuard]},
      {path: 'order-success', component: OrderSuccessComponent, canActivate: [AuthGuard]},

      {path: 'admin/orders', component: AdminOrdersComponent, canActivate: [AuthGuard, AdminAuthGuard]},
      {path: 'admin/products/create', component: ProductFormComponent, canActivate: [AuthGuard, AdminAuthGuard]},
      {path: 'admin/products/:id', component: ProductFormComponent, canActivate: [AuthGuard, AdminAuthGuard]},
      {path: 'admin/products', component: AdminProductsComponent, canActivate: [AuthGuard, AdminAuthGuard]},

      {path: '**', component: NotFoundComponent},
    ]),
    FormsModule,
    CustomFormsModule
  ],
  providers: [ AuthService,
    AuthGuard,
    UserService,
    AdminAuthGuard,
    ProductService,
    CategoryService, 
    ShoppingCartService,
  
    ProductMapper,
    ShoppingCartMapper, 
    CategoryMapper, 
    ShoppingCartMapper, 
    CartItemMapper],
  bootstrap: [AppComponent]
})
export class AppModule { }
