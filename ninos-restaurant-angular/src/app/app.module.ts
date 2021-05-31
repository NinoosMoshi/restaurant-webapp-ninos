import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { OrderListComponent } from './components/order-list/order-list.component';
import { CategoryListComponent } from './components/category-list/category-list.component';
import { DropMenuComponent } from './components/drop-menu/drop-menu.component';
import { SearchComponent } from './components/search/search.component';
import { OrderDetailsComponent } from './components/order-details/order-details.component';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { CartStatusComponent } from './components/cart-status/cart-status.component';
import { CheckOutComponent } from './components/check-out/check-out.component';
import { PurchasesComponent } from './components/purchases/purchases.component';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './components/login/login.component';



@NgModule({
  declarations: [
    AppComponent,
    OrderListComponent,
    CategoryListComponent,
    DropMenuComponent,
    SearchComponent,
    OrderDetailsComponent,
    CartStatusComponent,
    CheckOutComponent,
    PurchasesComponent,
    LoginComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbPaginationModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
