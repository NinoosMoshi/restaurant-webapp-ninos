import { LoginComponent } from './components/login/login.component';
import { CheckOutComponent } from './components/check-out/check-out.component';
import { PurchasesComponent } from './components/purchases/purchases.component';
import { OrderDetailsComponent } from './components/order-details/order-details.component';
import { OrderListComponent } from './components/order-list/order-list.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [

  {path:'login', component:LoginComponent},
  {path:'checkout', component:CheckOutComponent},
  {path:'purchases', component:PurchasesComponent},
  {path:'category/:id', component: OrderListComponent},
  {path:'order/:id', component:OrderDetailsComponent},
  {path:'orders/:key', component:OrderListComponent},
  {path:'orders', component:OrderListComponent},
  {path:'', redirectTo:'/orders',pathMatch:'full'},
  {path:'**', redirectTo:'/orders',pathMatch:'full'}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
