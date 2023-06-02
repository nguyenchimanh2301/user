using System;
using System.Collections.Generic;

// Code scaffolded by EF Core assumes nullable reference types (NRTs) are not used or disabled.
// If you have enabled NRTs for your project, then un-comment the following line:
// #nullable disable

namespace API.Models
{
    public partial class BillDetailBan
    {
        public string Id { get; set; }
        public string IdBillBan { get; set; }
        public string Masp { get; set; }
        public string IdKh { get; set; }
        public int? Tongtien { get; set; }
        public short? Soluong { get; set; }
        public string Chietkhau { get; set; }
        public short? Tralai { get; set; }
    }
}
