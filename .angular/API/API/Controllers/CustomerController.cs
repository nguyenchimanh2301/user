using Microsoft.AspNetCore.Mvc;
using API.Models;
using System.Linq;
using System.Collections.Generic;

namespace API.Controllers
{
    [ApiController]
    public class CustomerController : Controller
    {
            APIContext db = new APIContext();
            [Route("checkout")]
            [HttpPost]
            public IActionResult Createbill([FromBody] checkout model)
            {
                db.KhachHang.Add(model.kh);
                db.SaveChanges();

                string MaKhachHang = model.kh.Id;
                BillsBan dh = new BillsBan();
                dh.Id = MaKhachHang;
                dh.Trangthai = "ok";
                db.BillsBan.Add(dh);
                db.SaveChanges();
                string MaDonHang = dh.Id;

                if (model.donhang.Count > 0)
                {
                    foreach (var item in model.donhang)
                    {
                        item.Id = MaDonHang;
                        db.BillDetailBan.Add(item);
                    }
                    db.SaveChanges();
                }
                return Ok(new { data = "OK" });

            }
        }
        public class checkout
        {

            public KhachHang kh;
            public List<BillDetailBan> donhang { get; set; }


        }
    }
