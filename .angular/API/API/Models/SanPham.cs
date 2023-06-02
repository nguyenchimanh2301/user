using System;
using System.Collections.Generic;

// Code scaffolded by EF Core assumes nullable reference types (NRTs) are not used or disabled.
// If you have enabled NRTs for your project, then un-comment the following line:
// #nullable disable

namespace API.Models
{
    public partial class SanPham
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public string IdLoaiSp { get; set; }
        public string IdNcc { get; set; }
        public string MotaSp { get; set; }
        public int? UnitPrice { get; set; }
        public int SoLuong { get; set; }
        public string Image { get; set; }
        public string DonViTinh { get; set; }

        public virtual LoaiSp IdLoaiSpNavigation { get; set; }
    }
}
