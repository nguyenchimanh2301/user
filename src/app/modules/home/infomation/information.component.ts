import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-infomation',
  templateUrl: './infomation.component.html',
  styleUrls: ['./infomation.component.css']
})
export class InformationComponent implements OnInit {
  formTT!:FormGroup
  infomation:any;
  cus:any;
  name:any;
  host = environment.BASE_API;
  page:number = 1;
  count:number = 0;
  public table_size:number = 2;
  table_numberSize:any = [1,2,3];
  size:any = 2;
  active=true;
  order:any;
  khach:any;
  detail_order:any;
  orderdetail=true;
  modal = true;
  total:number = 0;
  public htmlContent!: string;
  constructor(private fb:FormBuilder,private http:HttpClient) { 
   

  }
  ngOnInit(): void {
  this.gethd();
    this.formTT = new FormGroup({
      'ten_kh': new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]),
      'txt_sdt': new FormControl('', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]),
      'email': new FormControl('', [Validators.email]),
      'txt_address': new FormControl('', [Validators.required]),
      'txt_ghichu': new FormControl('')
    });
    this.infomation = JSON.parse(localStorage.getItem('user')|| '{}');
    this.http.get(this.host+'/get_cus_by_id?id='+Number(this.infomation.maNguoiDung)).subscribe(x=>{
    this.cus = x;
    console.log(this.cus);
    this.formTT = this.fb.group({
      ten_kh:   [this.cus.tenKh],
      email:         [  this.cus.email],
      txt_sdt:         [  this.cus.sdt],
      txt_address:         [  this.cus.diaChi],
    });
  });
}
  get tenkh() {
    return this.formTT.get('ten_kh')!;
  }
  get hoten() {
    return this.formTT.get('txt_name')!;
  }
  get sodienthoai() {
    return this.formTT.get('txt_sdt')!;
  }
  get email() {
    return this.formTT.get('email')!;
  }
  get diachi() {
    return this.formTT.get('txt_address')!;
  }
  onSubmit(val: any): void {
    let obj = {
      "id": Number(this.infomation.maNguoiDung),
      "tenKh": val.ten_kh,
      "email": val.email,
      "diaChi": val.txt_address,
      "sdt": val.txt_sdt,
      "note": ""
    };
      if (confirm("Bạn có chắc muốn cập nhật lại thông tin" )) {
        this.http.put(this.host + "/update_kh", obj).subscribe(x => {
        alert("Cập nhật thành công");
        window.location.reload();
      });
      } 
      else {

        
      }
  
  }
  sizeChange(event:any):void{
    this.table_size = event.target.value; 
    this.page = 1;
  }
  dataChange(event:any):void{
    this.page = event;
  }
  gethd(){
    this.infomation = JSON.parse(localStorage.getItem('user')|| '{}');
    this.http.get(this.host + "/get_donhan_khachhang?id="+Number(this.infomation.maNguoiDung)).subscribe(x => {
      this.order = x;
      console.log(x);
  })
  }
  show(val:any){

  }
}
