using System;
using System.Collections.Generic;

// Code scaffolded by EF Core assumes nullable reference types (NRTs) are not used or disabled.
// If you have enabled NRTs for your project, then un-comment the following line:
// #nullable disable

namespace API.Models
{
    public partial class BillsNhap
    {
        public BillsNhap()
        {
            BillDetailNhap = new HashSet<BillDetailNhap>();
        }

        public string Id { get; set; }
        public string IdNcc { get; set; }
        public string IdNhanvien { get; set; }
        public DateTime? DateOrder { get; set; }
        public double? TongTien { get; set; }
        public string ThanhToan { get; set; }
        public string Note { get; set; }
        public DateTime? CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }

        public virtual ICollection<BillDetailNhap> BillDetailNhap { get; set; }
    }
}
