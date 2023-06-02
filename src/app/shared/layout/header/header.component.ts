import { map } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  products:any;
  name:any
  constructor() { }
     
  ngOnInit(): void {
   this.products = JSON.parse(localStorage.getItem('user') || '{}');
   this.name = this.products.hoTen;
  }

}
