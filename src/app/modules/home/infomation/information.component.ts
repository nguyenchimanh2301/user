import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-infomation',
  templateUrl: './infomation.component.html',
  styleUrls: ['./infomation.component.css']
})
export class InformationComponent implements OnInit {
  formTT!:FormGroup
  infomation:any;
  name:any;
  constructor(private fb:FormBuilder) { 
   

  }
  ngOnInit(): void {
  
    this.formTT = new FormGroup({
      'ten_kh': new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]),
      'txt_sdt': new FormControl('', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]),
      'email': new FormControl('', [Validators.email]),
      'txt_address': new FormControl('', [Validators.required]),
      'txt_ghichu': new FormControl('')
    });
  this.infomation = JSON.parse(localStorage.getItem('user')|| '{}');

    this.formTT = this.fb.group({
      ten_kh:   [this.infomation.hoTen],
      email:         [  this.infomation.email],
      txt_sdt:         [  this.infomation.dienThoai],
      txt_address:         [  this.infomation.diaChi],

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
  onSubmit(val:any):void{

  }
}
