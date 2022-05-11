using Microsoft.IdentityModel.Tokens;
using System.Text;

namespace Diary.Identity
{
    public class AuthOptions
    {
        public const string ISSUER = "https://localhost:7022"; // издатель токена
        public const string AUDIENCE = "https://localhost:44407"; // потребитель токена
        const string KEY = "superSecretKey@345";   // ключ для шифрации
        public const int LIFETIME = 60; // время жизни токена - 1 минута
        public static SymmetricSecurityKey GetSymmetricSecurityKey()
        {
            return new SymmetricSecurityKey(Encoding.UTF8.GetBytes(KEY));
        }
    }
}
