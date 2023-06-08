import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {

  list_product:any
    page:number = 1;
    count:number = 0;
    table_size:number = 9;
    table_numberSize:any = [6,9,12];
    size:any = 5;
    category:any; 
    price1:any = [0,50000,100000,200000,300000,500000];
    price2:any = [0,50000,100000,200000,500000];
    gia1:any;
    gia2:any;
     public host = environment.BASE_API;
  constructor(private http:HttpClient) { }

  ngOnInit(): void {
     this.http.get('https://localhost:44310/get_all_baiviet').subscribe(res=>{
      this.list_product = res;
      console.log(res);
    })
    this.http.get(this.host+'/get_all_loaihomestay').subscribe(res=>{
      this.category = res;
    })
  }
  load():void{
    this.http.get('https://localhost:44310/get_list_product').subscribe(res=>{
      this.list_product = res;
    })
  }
  sizeChange(event:any):void{
    this.table_size = event.target.value;
    this.page = 1;
    this.load();
  }
  dataChange(event:any):void{
    this.page = event;
    this.load();
  }
  addcart(item:any){
    alert('THÊM VÀO GIỎ HÀNG THÀNH CÔNG')
  }
  Filter(item:any){
    this.http.get(this.host+'/Search_by_idcategory?id='+item.id).subscribe(res=>{
      this.list_product = res;
      console.log(this.list_product);
    })
  }
  Filter2(event:any){
    this.gia1 = (<HTMLInputElement>document.getElementById('price1')).value;
    this.gia2 = event.target.value;
    console.log(this.gia1,this.gia2);
    this.http.get(this.host+'/Search_by_price?price1='+this.gia1+'&price2='+this.gia2).subscribe(res=>{
      this.list_product = res;
      console.log(this.list_product);
    })
  }
  search(){
    let name = (<HTMLInputElement>document.getElementById('name')).value;
    let gia = (<HTMLInputElement>document.getElementById('gia')).value;
    // let addr = (<HTMLInputElement>document.getElementById('address')).value;
    let loaip = (<HTMLInputElement>document.getElementById('loaip')).value;
    console.log(loaip);
    try{
      this.http.get(this.host+'/Search_Homstay?name='+name+'&idloai='+loaip+'&gia='+Number(gia)).subscribe(data=>{
        this.list_product = data;
      });
    }
    catch(err){
      console.log(err);
    }
  }
}

