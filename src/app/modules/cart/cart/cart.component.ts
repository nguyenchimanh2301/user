import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/service/cartservice';
import { Router, ActivatedRoute, } from '@angular/router';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  public list_cart:any
  public total=0;
  constructor(private cart_sv:CartService,private route:Router) { }

  ngOnInit(): void {
    this.list_cart = JSON.parse(localStorage.getItem('cart') || '[]');;
    console.log(this.list_cart);
    this.total = this.list_cart.reduce((sum:any, x:any) => sum +  x.unit_price * x.quantity, 0);
  }
  
  public Giam(maSanPham: any) {
    var index:number = this.list_cart.findIndex((x: any) => x.id == maSanPham);
    console.log(index);
    if (index >= 0 && this.list_cart[index].quantity >= 1) {
      this.list_cart[index].quantity -= 1;
    localStorage.setItem('cart', JSON.stringify(this.list_cart));
      this.total = this.list_cart.reduce((sum:any, x:any) => sum + x.unit_price  * x.quantity, 0);
    }
  }
  public Tang(maSanPham: any) {
    var index = this.list_cart.findIndex((x: any) => x.maSanPham == maSanPham);
    if (index >= 0) {
      this.list_cart[index].quantity += 1;
      this.total = this.list_cart.reduce((sum:any, x:any) => sum + x.unit_price  * x.quantity, 0);
    }
  }
  public XoaCart() {
    if (confirm("Bạn muốn xóa tất cả sản phẩm khỏi giỏ hàng!")) {
        localStorage.setItem('cart','');
        this.list_cart = null;
        this.total = 0;
    }
  }
  public updateCart() {
    localStorage.setItem('cart', JSON.stringify(this.list_cart));
    alert("Đã cập nhật thông tin giỏ hàng thành công!");
  }
  public incre(item:any) {
     this.cart_sv.addToCart(item);
     this.list_cart = JSON.parse(localStorage.getItem('cart') || '[]');
     this.total = this.list_cart.reduce((sum:any, x:any) => sum + x.unit_price  * x.quantity, 0);
  }
  public Xoa(maSanPham: any) {
    if (confirm("Bạn muốn xóa sản phẩm này khỏi giỏ hàng!")) {
      var index = this.list_cart.findIndex((x: any) => x.id == maSanPham);
      if (index >= 0) {
        this.list_cart.splice(index, 1);
        this.total = this.list_cart.reduce((sum:any, x:any) => sum + x.unit_price  * x.quantity, 0);
      }
    }
  }
  checkout():void{
    this.route.navigate(['/', 'checkout']);
  }
  updatec(){
    this.total = this.list_cart.reduce((sum:any, x:any) => sum + x.unit_price  * x.quantity, 0);
  }

}
