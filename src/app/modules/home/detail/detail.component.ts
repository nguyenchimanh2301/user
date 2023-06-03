import { Component, OnInit ,OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { Subscription } from 'rxjs';
import { CartService } from 'src/app/service/cartservice';
import { environment } from 'src/environments/environment';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';
@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit , OnDestroy {
  public product_Detail:any
  public id:any
  public date:any;
  public subscription!: Subscription;
  public host = environment.BASE_API;
  listProduct:any;
  Product:any;
    add_succes = true;
  popup:any = true;
  public frmCustomer!: FormGroup ;
  public list_items:any;                                                                     
  public total:number=0;
  public url = environment.BASE_API;
  constructor(private fb:FormBuilder,private http:HttpClient,private router:Router,private activatedRoute: ActivatedRoute,private cart:CartService) { }
  
  ngOnInit(): void {
   this.subscription = this.activatedRoute.params.subscribe(params =>{
    this.id = params['id'];
    console.log(this.id);

    this.http.get<any>(this.host+'/get_all_homestay').subscribe(data => {
      this.Product = data;
    })
  })
  this.load();
  this.loadsp();

}




  ngOnDestroy(): void {
      this.subscription.unsubscribe();
  }
  addCart(item:any): void {
    this.cart.addToCart(item);
    alert('Đã thêm vào yêu thích');
  }
  remove(){
    localStorage.removeItem('id');
  }
  load(){
    let id_lsp:any = JSON.parse(localStorage.getItem('cart') || '{}');
    console.log(id_lsp);
    this.http.get('https://localhost:44310/get_cung_loai?id_lsp='+id_lsp.id_loai_sp).subscribe(data => {
      this.listProduct = data;
      console.log(this.listProduct);
    })
  }
  loadsp(){
    this.http.get(this.host+'/getht_by_id?id='+this.id).subscribe(res=>{
      this.product_Detail = res;
      console.log(this.product_Detail);
      localStorage.setItem('id', JSON.stringify(this.product_Detail));
    })
    this.frmCustomer = new FormGroup({
      'txt_name': new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]),
      'txt_sdt': new FormControl('', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]),
      'txt_email': new FormControl('', [Validators.email]),
      'txt_address': new FormControl('', [Validators.required]),
      'txt_ghichu': new FormControl('')
    });
  
  }
  showpopup():void{
    this.popup=false;
    this.frmCustomer = this.fb.group({
      txt_name   : [''],
      txt_sdt:         [''],
      txt_email: [''],
      txt_address: [''],

      // txt_mota:    [''],
      // txt_soluong: [''],
      // txt_donvi:   [''],

    });
  }

get hoten() {
  return this.frmCustomer.get('txt_name')!;
}
get sodienthoai() {
  return this.frmCustomer.get('txt_sdt')!;
}
get email() {
  return this.frmCustomer.get('txt_email')!;
}
get diachi() {
  return this.frmCustomer.get('txt_address')!;
}
public close():void{
  this.popup = true;
}
public onSubmit(val: any) {
const thanhtoan: string = (document.getElementById("thanhtoan") as HTMLInputElement).value; 

const inputDate: string = (document.getElementById("checkin") as HTMLInputElement).value; 
const inputDate2: string = (document.getElementById("checkout") as HTMLInputElement).value; // Thay "myDateInput" bằng ID của trường ngày
const formattedDate = moment(inputDate, "YYYY-MM-DD");
const formattedDate2 = moment(inputDate2, "YYYY-MM-DD");
const duration = moment.duration(formattedDate2.diff(formattedDate));
const numberOfDays = duration.asDays();
console.log(numberOfDays);
  let obj: any = {}
    obj.kh={
      "tenKh": val.txt_name,
      "email": val.txt_email,
      "diaChi": val.txt_address,
      "sdt": val.txt_sdt,
      "note": "oke"
    },
    obj.donhang=
      {
        "idp": this.product_Detail.id,
        "tongthoigiandat": numberOfDays,
        "dongia": this.product_Detail.gia,
        "thanhtien": 0,
        "idpNavigation": {
          "id": 0,
          "tenPhong": "string",
          "idloaiPhong": 0,
          "dongia": numberOfDays,
          "anh": "string",
          "trangthai": true,
          "ngayThem": "2023-05-31T09:07:25.298Z",
          "nguoiTao": "string",
          "ngayCapNhat": "2023-05-31T09:07:25.298Z",
          "nguoiCapNhat": "string",
          "idloaiPhongNavigation": {
            "id": 0,
            "tenLoaiPhong": "string",
            "ngayTao": "2023-05-31T09:07:25.298Z",
            "nguoiTao": "string",
            "ngayCapNhat": "2023-05-31T09:07:25.298Z",
            "nguoiCapNhat": "string"
          }
        }
      }
    obj.datphong = {
      "tenkh": "string",
      "ngaydat": formattedDate,
      "ngaytra": formattedDate2,
      "thanhtien": String(this.product_Detail.gia * numberOfDays),
      "thanhtoan": Boolean(thanhtoan),
      "idkhNavigation": {  "tenKh": "string",
      "email": "string",
      "diaChi": "string",
      "sdt": "string",
      "note": "string"}
    }
    if(this.hoten==null)
    {
       alert("Hãy nhập đủ thông tin");
    }
    else{
      console.log(obj);
      this.http.post('https://localhost:44310/checkout',obj).subscribe(res => {
        alert("Đặt phòng thành công");
        this.popup =true;
        // this.list_items = JSON.parse(localStorage.getItem('cart') || '[]');
      });
    }
}
}

