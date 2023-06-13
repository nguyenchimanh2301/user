import { Component, OnInit ,OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { Subscription, first } from 'rxjs';
import { CartService } from 'src/app/service/cartservice';
import { environment } from 'src/environments/environment';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';
import { AuthenticationService } from 'src/app/core/authentication/authentication.service';
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
  infomation:any;
  cus:any;
  public logins = true;
  selectedPaymentMethod: boolean | null = null;
  Product:any;
  add_succes = true;
  popup:any = true;
  public frmCustomer!: FormGroup ;
  public list_items:any;                                                                     
  public total:number=0;
  public url = environment.BASE_API;
  public frmLogin!:FormGroup;
  public submitted = false;
  public loading = false;
  public returnUrl!:string;
  public error = '';
 
  constructor(private  route:ActivatedRoute,private auService:AuthenticationService,private fb:FormBuilder,private http:HttpClient,private router:Router,private activatedRoute: ActivatedRoute,private cart:CartService) {
   }
  ngOnInit(): void {
    this.logins = true;
   this.subscription = this.activatedRoute.params.subscribe(params =>{
    this.id = params['id'];
    console.log(this.id);
  })
    this.infomation = JSON.parse(localStorage.getItem('user')|| 'null');
    console.log(this.infomation);
    this.http.get<any>(this.host+'/get_all_homestay').subscribe(data => {
      this.Product = data;
    })
    this.frmLogin = new FormGroup({
      'txt_user': new FormControl('', [Validators.required]),
      'txt_password': new FormControl('', [Validators.required]),
    });
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  this.loadsp();


}
ngOnDestroy(): void {
  this.subscription.unsubscribe();
}
get taikhoan() {
  return this.frmLogin.get('txt_user')!;
}
get matkhau() {
  return this.frmLogin.get('txt_password')!;
}
public login(value:any){
  this.submitted = true;
  if(this.frmLogin.invalid){
       return;
  }
  this.loading = true;
  this.auService.login(value.txt_user,value.txt_password)
  .pipe(first()).subscribe(
    (data)=>{
      alert("Đăng nhập thành công")
      this.router.navigate(['/index']);
    },
    (error)=>{
      this.error = error;
      this.loading = false;
      alert("Sai tên tài khoản hoặc mật khẩu");
    }
  );
}
  addCart(item:any): void {
    this.cart.addToCart(item);
    alert('Đã thêm vào yêu thích');
  }
  remove(){
    localStorage.removeItem('id');
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
    this.infomation = JSON.parse(localStorage.getItem('user')|| 'null');
    if(this.infomation==null){
      if(confirm("Hiện tại chưa có thông tin Bạn có có đăng muốn đăng nhập không ?")){
        this.logins= false;
      }
      else{
      this.popup=false;
        this.frmCustomer = this.fb.group({
          txt_name   : [''],
          txt_sdt:         [''],
          txt_email: [''],
          txt_address: [''],
        });
      }
     }else{
    this.popup=false;

      this.http.get(this.host+'/get_cus_by_id?id='+Number(this.infomation.maNguoiDung)).subscribe(x=>{
        this.cus=x;
      console.log(this.cus);
      this.frmCustomer = this.fb.group({
        txt_name:   [this.cus.tenKh],
        txt_email:  [  this.cus.email],
        txt_sdt:      [  this.cus.sdt],
        txt_address:  [  this.cus.diaChi],
      });
    });
    }
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
  let obj2 : any = {}
  {
    obj2.donhang ={
      "idp": this.product_Detail.id,
      "tongthoigiandat": numberOfDays,
      "dongia": this.product_Detail.dongia,
      "thanhtien": String(this.product_Detail.dongia * numberOfDays),
      "idpNavigation": {
        "id": 0,
        "tenPhong": "string",
        "idloaiPhong": 0,
        "dongia":this.product_Detail.dongia,
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
    },
    obj2.datphong= {
      "idkh": Number(this.infomation.maNguoiDung),
      "tenkh": "string",
      "ngaydat": formattedDate,
      "ngaytra": formattedDate2,
      "thanhtien": String(this.product_Detail.dongia * numberOfDays),
      "thanhtoan": this.selectedPaymentMethod,
      "idkhNavigation": {  "tenKh": "string",
      "email": "string",
      "diaChi": "string",
      "sdt": "string",
      "note": "string"}
    }
  }
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
        "dongia": this.product_Detail.dongia,
        "thanhtien": String(this.product_Detail.dongia * numberOfDays),
        "idpNavigation": {
          "id": 0,
          "tenPhong": "string",
          "idloaiPhong": 0,
          "dongia": this.product_Detail.id,
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
      "thanhtien": String(this.product_Detail.dongia * numberOfDays),
      "thanhtoan": Boolean(thanhtoan),
      "idkhNavigation": {  "tenKh": "string",
      "email": "string",
      "diaChi": "string",
      "sdt": "string",
      "note": "string"}
    }
    this.infomation = JSON.parse(localStorage.getItem('user')|| '{}');

    if(this.infomation==null)
    {
      console.log(obj);
      this.http.post('https://localhost:44310/checkout',obj).subscribe(res => {
        this.add_succes = false;
        setTimeout(()=>{this.add_succes=true;},2000);
        this.popup =true;
        // this.list_items = JSON.parse(localStorage.getItem('cart') || '[]');
      });
    }
    else{
      this.http.post('https://localhost:44310/checkout_cokh',obj2).subscribe(res => {
        console.log(obj2);
        this.add_succes = false;
        setTimeout(()=>{this.add_succes=true;},2000);
        this.popup =true;
        // this.list_items = JSON.parse(localStorage.getItem('cart') || '[]');
      });
    }
}
closelogin(){
  this.logins= true;
}
}
