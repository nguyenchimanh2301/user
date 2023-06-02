using System;
using System.Collections.Generic;

// Code scaffolded by EF Core assumes nullable reference types (NRTs) are not used or disabled.
// If you have enabled NRTs for your project, then un-comment the following line:
// #nullable disable

namespace API.Models
{
    public partial class NhaCungCap
    {
        public string Id { get; set; }
        public string TenNcc { get; set; }
        public string DiachiNcc { get; set; }
        public string Email { get; set; }
        public string Sdt { get; set; }
    }
}
