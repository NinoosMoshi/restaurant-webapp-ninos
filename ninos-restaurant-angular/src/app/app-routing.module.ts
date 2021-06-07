import { CodeActivationComponent } from './components/code-activation/code-activation.component';
import { SignupComponent } from './components/signup/signup.component';
import { LoginComponent } from './components/login/login.component';
import { CheckOutComponent } from './components/check-out/check-out.component';
import { PurchasesComponent } from './components/purchases/purchases.component';
import { OrderDetailsComponent } from './components/order-details/order-details.component';
import { OrderListComponent } from './components/order-list/order-list.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RouteActiveService } from './services/activated/route-active.service';
import { LoginActiveService } from './services/activated/login-active.service';

const routes: Routes = [

  {path:'active', component:CodeActivationComponent},
  {path:'login', component:LoginComponent, canActivate:[LoginActiveService]},
  {path:'signup', component:SignupComponent, canActivate:[LoginActiveService]},
  {path:'checkout', component:CheckOutComponent, canActivate:[RouteActiveService]},
  {path:'purchases', component:PurchasesComponent, canActivate:[RouteActiveService]},
  {path:'category/:id', component: OrderListComponent, canActivate:[RouteActiveService]},
  {path:'order/:id', component:OrderDetailsComponent, canActivate:[RouteActiveService]},
  {path:'orders/:key', component:OrderListComponent, canActivate:[RouteActiveService]},
  {path:'orders', component:OrderListComponent, canActivate:[RouteActiveService]},
  {path:'', redirectTo:'/orders',pathMatch:'full'},
  {path:'**', redirectTo:'/orders',pathMatch:'full'}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
