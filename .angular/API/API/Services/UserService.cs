using API.helper;
using System.IdentityModel.Tokens.Jwt;
using API.Entities;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using Microsoft.Extensions.Options;
using API.Models;
using System.Linq;
using System.Data;
using System.Security.Claims;
using System;

namespace API.Services
{
    public interface IUserService
    {
        User Authenticate(string username, string password);
    }
    public class UserService : IUserService
    {
        public UserService(IOptions<AppSettings> appSettings)
        {
            _appSettings = appSettings.Value;
        }
        APIContext db = new APIContext();
        private readonly AppSettings _appSettings;

        public User Authenticate(string username, string pass)
        {
            var result = from t in db.Account
                         join n in db.Users on t.MaNguoiDung equals n.Id
                         select new User 
                         { Role = t.LoaiQuyen, MaNguoiDung = t.MaNguoiDung, TaiKhoan = t.TaiKhoan,
                             HoTen = n.FullName, MatKhau = t.MatKhau, DiaChi = n.Address, 
                             DienThoai = n.Phone, Email = n.Email };
            var user = result.SingleOrDefault(x => x.TaiKhoan == username && x.MatKhau == pass);
            if (user == null)
            {
                return null;
            }
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_appSettings.Secret);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                 {
                    new Claim(ClaimTypes.NameIdentifier, user.TaiKhoan.ToString()),
                    new Claim(ClaimTypes.MobilePhone, user.DienThoai.ToString()),
                    new Claim(ClaimTypes.Email, user.Email.ToString())
                 }),
                Expires = DateTime.UtcNow.AddDays(7),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            user.Token = tokenHandler.WriteToken(token);
            return user.WithoutPassword();
        }
    }

}
