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
  public title:any ;

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
    const password1 = (document.getElementById("password-field") as HTMLInputElement).value;
    const password2 = (document.getElementById("confirm-password-field") as HTMLInputElement).value;
    console.log(password1 === password2);
    if(value.txt_user.length <1 || value.length <1  == null || value.email.length <1 || value.sdt.length !=10) {
     alert("Các trường không được để trống và không quá ngắn");
    } else {
      if (password1 === password2) {
        this.http.post("https://localhost:44310/dangki",obj)
        .subscribe(
        (data)=>{
              
          this.title ="ĐĂNG KÍ THÀNH CÔNG"
          this.add_succes = false;
          setTimeout(()=>{this.add_succes=true;},2000);
          setTimeout(()=>{this.router.navigate(['']);
         },2000);
        },
        (error)=>{
          this.error = error;
          this.loading = false;
          this.title ="ĐĂNG KÍ LỖI"
          this.add_succes = false;
          setTimeout(()=>{this.add_succes=true;},2000);
        }
      );
    }
    else{
      this.title ="MẬT KHẨU KHÔNG KHỚP"
      this.add_succes = false;
      setTimeout(()=>{this.add_succes=true;},2000);
    }
    }
  }
  

}
