import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CartService } from 'src/app/service/cartservice';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {
   public listProduct:any
   public listProducts:any
   public host = environment.BASE_API;
   listProduct_date:any;
   listHomestay:any;

  constructor(private http:HttpClient,private cart:CartService) { }
   
  ngOnInit(): void {
   this.remove()
    this.http.get<any>(this.host+'/get_all_homestay').subscribe(data => {
      this.listProduct = data;
    })
    this.http.get<any>(this.host+'/get_giare').subscribe(data => {
      this.listHomestay = data;
    })
    this.http.get<any>(this.host+'/get_moi').subscribe(data => {
      this.listProduct_date = data;
    })
  } 
  addCart(item:any):void{
       this.cart.addToCart(item);
       alert('Thêm giỏ hàng thành công')
  }
  remove(){
    localStorage.removeItem('id');
  }
}

    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    
