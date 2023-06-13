import { IndexComponent } from './index/index.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedComponent } from 'src/app/shared/shared.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// export const MainRoutes: Routes = [
//   {
//     path: '', component: IndexComponent,
//     children: [
//       { path: '/list_product', component: ListproductComponent },
//       // { path: 'homes', loadChildren: () => import('./homes/homes.module').then(m => m.HomesModule)},
//       // { path: 'customers', loadChildren: () => import('./customers/customers.module').then(m => m.CustomersModule)},
//     ]
//   }
// ];


@NgModule({
  declarations: [
    SharedComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class HomeModule { }
