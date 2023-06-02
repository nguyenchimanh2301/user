using System;
using System.Collections.Generic;

// Code scaffolded by EF Core assumes nullable reference types (NRTs) are not used or disabled.
// If you have enabled NRTs for your project, then un-comment the following line:
// #nullable disable

namespace API.Models
{
    public partial class BillsBan
    {
        public string Id { get; set; }
        public string IdKh { get; set; }
        public DateTime? NgayBan { get; set; }
        public double? TongTien { get; set; }
        public string Trangthai { get; set; }
        public string Ghichu { get; set; }
        public string TenKh { get; set; }
    }
}
