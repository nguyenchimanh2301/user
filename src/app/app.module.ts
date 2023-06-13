import { CartModule } from './modules/cart/cart.module';
import { HeaderComponent } from './shared/layout/header/header.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedComponent } from './shared/shared.component';
import { FooterComponent } from './shared/layout/footer/footer.component';
import { IndexComponent } from './modules/home/index/index.component';
import { SearchComponent } from './shared/layout/search/search.component';
import { HttpClientModule } from '@angular/common/http';
import { NgxPaginationModule } from 'ngx-pagination';
import { ListproductComponent } from './modules/home/listproduct/listproduct.component';
import { LoginComponent } from './modules/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './modules/register/register.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SharedComponent,
    FooterComponent,
    IndexComponent,
    SearchComponent,
    ListproductComponent,
    LoginComponent,
    RegisterComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule,
    NgxPaginationModule,
    CartModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
