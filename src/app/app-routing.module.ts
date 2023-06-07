import { CheckoutComponent } from './modules/cart/checkout/checkout.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './modules/cart/cart/cart.component';

// const routes: Routes = [
//   { path: '', component: IndexComponent },
//   { path: 'cart', component: CartComponent },
//   { path: 'detail/:id', component: DetailComponent },
//   { path: 'detail/:id', component: DetailComponent },
//   { path: 'list_product', component: ListproductComponent },
//   { path: 'checkout', component: CheckoutComponent },
// ];
const routes: Routes = [
  { path: '', loadChildren: () => import('./modules/modules.modules').then(m => m.ModulesModule)},

  // { path: 'login', component: LoginComponent },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }