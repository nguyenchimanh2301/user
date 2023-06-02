using System;
using System.Collections.Generic;

// Code scaffolded by EF Core assumes nullable reference types (NRTs) are not used or disabled.
// If you have enabled NRTs for your project, then un-comment the following line:
// #nullable disable

namespace API.Models
{
    public partial class BillDetailNhap
    {
        public string Id { get; set; }
        public string IdBillNhap { get; set; }
        public string IdSp { get; set; }
        public int Sl { get; set; }
        public string DonVi { get; set; }
        public DateTime? CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }

        public virtual BillsNhap IdBillNhapNavigation { get; set; }
    }
}
