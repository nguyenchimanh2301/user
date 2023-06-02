import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {

  constructor(private http:HttpClient) { }
  public host = environment.BASE_API;
  baiviet:any;
  ngOnInit(): void {
     this.http.get(this.host+'/get_all_baiviet').subscribe(data=>{
        this.baiviet=data;
     })
     }
}
