using API.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : Controller
    {
            private IUserService _userService;
            public UserController(IUserService userService)
            {
                _userService = userService;
            }
            [AllowAnonymous]
            [HttpPost("authenticate")]
            public IActionResult Authenticate([FromBody] AuthenticateModel model)
            {
                var user = _userService.Authenticate(model.Username, model.Password);

                if (user == null)
                    return BadRequest(new { message = "Tài khoản hoặc mật khẩu sai!" });

                return Ok(user);
            }

        }
}
