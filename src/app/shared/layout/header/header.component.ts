import { map } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  sum:number=0;
  products:any
  constructor() { }
     
  ngOnInit(): void {
   this.products = JSON.parse(localStorage.getItem('cart') || '[]');
   this.products.map((x:any)=>{
    this.sum+=1;
   })
  }

}
