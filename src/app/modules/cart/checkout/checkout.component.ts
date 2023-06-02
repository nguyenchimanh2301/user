import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ApiService } from 'src/app/service/apiservice';
@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  public frmCustomer!: FormGroup ;
  public list_items:any;                                                                     
  public total:number=0;
  public url = environment.BASE_API;
  constructor(private http:HttpClient,private api_sv:ApiService) { }

  ngOnInit(): void {
    this.list_items = JSON.parse(localStorage.getItem('cart') || '[]');
    this.list_items.map((x:any)=>{
      this.total += x.unit_price*x.quantity;
      console.log(this.total);
    })
    this.frmCustomer = new FormGroup({
      'txt_name': new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]),
      'txt_sdt': new FormControl('', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]),
      'txt_email': new FormControl('', [Validators.email]),
      'txt_address': new FormControl('', [Validators.required]),
      'txt_ghichu': new FormControl('')
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
  public onSubmit(val: any) {
    let obj: any = {}
      obj.kh={
        "id": "string",
        "tenKh": val.txt_name,
        "email": val.txt_name,
        "diaChi": "ok",
        "sdt": val.txt_email,
        "note": "oke"
      },
      obj.donhang = [
      ]
      this.list_items.forEach((x: any) => {
      obj.donhang.push({
        maSanPham: x.id.trim(),
        soLuong: x.quantity,
        giaMua: x.unit_price,
      })
     })
    console.log(obj);
    this.api_sv.post('/checkout',obj).subscribe(res => {
      alert("thanh toán thành công");
      localStorage.removeItem('cart');
      this.total =0;
      this.list_items = JSON.parse(localStorage.getItem('cart') || '[]');
    });
}
}
