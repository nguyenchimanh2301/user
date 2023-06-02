using System;
using System.Collections.Generic;

// Code scaffolded by EF Core assumes nullable reference types (NRTs) are not used or disabled.
// If you have enabled NRTs for your project, then un-comment the following line:
// #nullable disable

namespace API.Models
{
    public partial class Account
    {
        public int MaTaiKhoan { get; set; }
        public string MaNguoiDung { get; set; }
        public string TaiKhoan { get; set; }
        public string MatKhau { get; set; }
        public DateTime? NgayBatDau { get; set; }
        public DateTime? NgayKetThuc { get; set; }
        public bool? TrangThai { get; set; }
        public string LoaiQuyen { get; set; }

        public virtual Users MaNguoiDungNavigation { get; set; }
    }
}
