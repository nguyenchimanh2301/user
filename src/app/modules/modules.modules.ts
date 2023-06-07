import { ListproductComponent } from './home/listproduct/listproduct.component';
import { CheckoutComponent } from './cart/checkout/checkout.component';
import { CartComponent } from './cart/cart/cart.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './home/index/index.component';
import { DetailComponent } from './home/detail/detail.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NewsComponent } from './home/news/news.component';
import { LoginComponent } from './login/login.component';
import { InformationComponent } from './home/infomation/information.component';

export const MainRoutes: Routes = [
  
      { path: '', component: LoginComponent },
      { path: 'index', component: IndexComponent },
      { path: 'cart', component: CartComponent },
      { path: 'checkout', component:CheckoutComponent },
      { path: 'list_product', component:ListproductComponent },
      { path: 'detail/:id', component:DetailComponent },
      { path: 'news', component:NewsComponent },
      { path: 'info', component:InformationComponent },

    // children: [
    //   { path: 'homes', loadChildren: () => import('./home/home.module').then(m => m.HomeModule)},
    //   { path: 'cart', loadChildren: () => import('./cart/cart.module').then(m => m.CartModule)},
    // ]
  
];
@NgModule({
  declarations: [
    DetailComponent,
    NewsComponent,
    InformationComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(MainRoutes),
    FormsModule,
    ReactiveFormsModule
  ]
})


export class ModulesModule { }
