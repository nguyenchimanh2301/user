using System;
using System.Collections.Generic;

// Code scaffolded by EF Core assumes nullable reference types (NRTs) are not used or disabled.
// If you have enabled NRTs for your project, then un-comment the following line:
// #nullable disable

namespace API.Models
{
    public partial class LoaiSp
    {
        public LoaiSp()
        {
            SanPham = new HashSet<SanPham>();
        }

        public string Id { get; set; }
        public string Tenloai { get; set; }

        public virtual ICollection<SanPham> SanPham { get; set; }
    }
}
