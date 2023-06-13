import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';
import * as moment from 'moment';
@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css']
})
export class InfoComponent implements OnInit {
  list_new:any;
  currentDate:any;
  binh_luan:any;
  detail_new:any;
  public host = environment.BASE_API;
  public id:any
  public date:any;
  public subscription!: Subscription;
  public returnUrl!:string;
  public frmBL!:FormGroup;

  constructor(private http:HttpClient,private activatedRoute: ActivatedRoute,private fb:FormBuilder) { }

  ngOnInit(): void {
    this.http.get('https://localhost:44310/get_all_baiviet').subscribe(res=>{
      this.list_new = res;
      console.log(res);
    })
    this.subscription = this.activatedRoute.params.subscribe(params =>{
      this.id = params['id'];
      console.log(this.id);
      this.returnUrl = this.activatedRoute.snapshot.queryParams['returnUrl'] || '/';
    })
    this.frmBL = new FormGroup({
      'txt_bl': new FormControl('', [Validators.required]),
    });
    this.loadchitiet();
    this.loadbinhluan();
  }
  loadchitiet(){
    this.http.get(this.host+'/getbv_by_id?id='+this.id).subscribe(res=>{
      this.detail_new = res;
      console.log(this.detail_new);
    })
  }
  loadbinhluan(){
    this.http.get(this.host+'/get_all_binhluan'
    ).subscribe(res=>{
      this.binh_luan = res;
      console.log(this.detail_new);
    })
  }
  post(value:any){
    // this.currentDate = moment().format('YYYY-MM-DD HH:mm:ss');
    this.currentDate = new Date();
    const formattedDate = this.currentDate.toISOString();
    let name:any = JSON.parse(localStorage.getItem('user')||'{}');
    let obj:any= {
    "id": 0,
    "idUser": name.maTK,
    "binhluan1": value.txt_bl,
    "thoigian": formattedDate,
    "idUserNavigation": {
      "maTaiKhoan": 0,
      "idkh": 0,
      "anh": "string",
      "taiKhoan": "string",
      "matKhau": "string",
      "ngayBatDau": "2023-06-13T02:12:40.339Z",
      "ngayKetThuc": "2023-06-13T02:12:40.339Z",
      "trangThai": true,
      "loaiQuyen": "string",
      "idkhNavigation": {
        "id": 0,
        "tenKh": "string",
        "email": "string",
        "diaChi": "string",
        "sdt": "string",
        "note": "string"
      }
    }
  }
  console.log(obj);
  this.http.post(this.host+"/add_bl",obj)
  .subscribe(res=>{
    alert("đã bình luận");
    this.loadbinhluan();
    this.frmBL = this.fb.group({
      txt_name   : [''],
  });
  })
  }
}
