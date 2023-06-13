import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { first, iif } from 'rxjs';
import { AuthenticationService } from 'src/app/core/authentication/authentication.service';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  public frmLogin!:FormGroup;
  public submitted = false;
  add_succes = true;
  public loading = false;
  public returnUrl!:string;
  public error = '';
  constructor(private auService:AuthenticationService,private router:Router,private route:ActivatedRoute,private http:HttpClient) {
    if(this.auService.userValue){
      this.router.navigate(['/']);
    }
   }
  ngOnInit(): void {
    this.frmLogin = new FormGroup({
      'txt_user': new FormControl('', [Validators.required]),
      'txt_password': new FormControl('', [Validators.required]),
      'sdt': new FormControl('', [Validators.required]),
      'email': new FormControl('', [Validators.required]),
    });
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }
  get taikhoan() {
    return this.frmLogin.get('txt_user')!;
  }
  get matkhau() {
    return this.frmLogin.get('txt_password')!;
  }
  public login(value:any){
    this.submitted = true;
    var obj ={
        "kh": {
          "id": 0,
          "tenKh": "khách hàng",
          "email": value.email,
          "diaChi": "trống",
          "sdt": value.sdt,
          "note": "string"
        },
        "ac": {
          "maTaiKhoan": 0,
          "anh": "string",
          "taiKhoan": value.txt_user,
          "matKhau": value.txt_password,
          "ngayBatDau": "2023-06-13T03:16:54.232Z",
          "ngayKetThuc": "2023-06-13T03:16:54.232Z",
          "trangThai": true,
          "loaiQuyen": "User",
          "idkhNavigation": {
            "id": 0,
            "tenKh": "khách hàng",
            "email": "string",
            "diaChi": "trống",
            "sdt":  "string",
            "note": "string"
          }
        }
    }
    console.log(obj);
    this.loading = true;
    this.http.post("https://localhost:44310/dangki",obj)
    .subscribe(
      (data)=>{
        this.add_succes = false;
        setTimeout(()=>{this.add_succes=true;},2000);
        setTimeout(()=>{this.router.navigate(['']);
       },2000);

      },
      (error)=>{
        this.error = error;
        this.loading = false;
        alert("Sai tên tài khoản hoặc mật khẩu");
      }
    );
  }

}
