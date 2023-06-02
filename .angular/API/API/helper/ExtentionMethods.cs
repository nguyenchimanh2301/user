using System.Collections.Generic;
using System.Linq;
using API.Entities;
namespace API.helper
{
    public static class ExtentionMethods
    {
       
            public static IEnumerable<User> WithoutPasswords(this IEnumerable<User> users)
            {
                if (users == null) return null;

                return users.Select(x => x.WithoutPassword());
            }

            public static User WithoutPassword(this User user)
            {
                if (user == null) return null;

                user.MatKhau = null;
                return user;
            }
        /*Scaffold-DbContext "Server=LAPTOP-LLHPT87U\SQLEXPRESS;Database=API;Trusted_Connection=True;Encrypt=False;" Microsoft.EntityFrameworkCore.SqlServer -OutputDir Models -force*/
    }
}
