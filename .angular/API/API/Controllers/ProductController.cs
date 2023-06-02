using Microsoft.AspNetCore.Mvc;
using API.Models;
using System.Linq;
namespace API.Controllers
{
    public class ProductController : Controller
    {
        [ApiController]

        public class SanPhamController : Controller
        {
            APIContext db = new APIContext();
            [Route("getall")]
            [HttpGet]
            public ActionResult Get_all_Product()
            {
                var obj = db.SanPham.Select(sp => new
                {
                    id = sp.Id,
                    name = sp.Name,
                    id_loai_sp = sp.IdLoaiSp,
                    unit_price = sp.UnitPrice,
                    so_luong = sp.SoLuong,
                    image = sp.Image,

                }).Take(8).ToList();
                return Json(obj);
            }
            [Route("get_by_id")]
            [HttpGet]
            public ActionResult Getid(string id)
            {
                var obj = db.SanPham.Select(sp => new
                {
                    id = sp.Id,
                    name = sp.Name,
                    id_loai_sp = sp.IdLoaiSp,
                    unit_price = sp.UnitPrice,
                    so_luong = sp.SoLuong,
                    image = sp.Image,

                }).Where(x => x.id == id).FirstOrDefault();
                return Json(obj);
            }
            [Route("get_list_product")]
            [HttpGet]
            public ActionResult Get_list_Product()
            {
                var obj = db.SanPham.Select(sp => new
                {
                    id = sp.Id,
                    name = sp.Name,
                    id_loai_sp = sp.IdLoaiSp,
                    unit_price = sp.UnitPrice,
                    so_luong = sp.SoLuong,
                    image = sp.Image,

                }).ToList();
                return Json(obj);
            }
            [Route("Get_Product_byname")]
            [HttpGet]
            public ActionResult Get_Product_byname(string name)
            {
                var obj = db.SanPham.Select(sp => new
                {
                    id = sp.Id,
                    name = sp.Name,
                    id_loai_sp = sp.IdLoaiSp,
                    unit_price = sp.UnitPrice,
                    so_luong = sp.SoLuong,
                    image = sp.Image,

                }).Where(x => x.name.Contains(name)).ToList();
                return Json(obj);
            }
        }
    }
}
