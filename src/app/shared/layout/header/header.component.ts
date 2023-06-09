import { map } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  products:any;
  name:any
  constructor(private route:Router) { }
     
  ngOnInit(): void {
   this.load();
  }
  logout(){
   if(confirm('Bạn có muốn đăng xuất')){
    localStorage.removeItem('user');
    this.route.navigate(['']);
   }
  }
  load(){
    this.products = JSON.parse(localStorage.getItem('user') || '{}');
    this.name = this.products.hoTen;
  }
}
