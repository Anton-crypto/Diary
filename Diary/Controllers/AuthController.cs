using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using Diary.Models.IdentityModels;
using Diary.Identity;
using System.Web;


namespace Diary.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : Controller
    {
        private readonly IdentityContextDb _context;
        public AuthController(IdentityContextDb context)
        {
            _context = context;
        }

        [HttpPost]
        [Route("login")]
        public IActionResult Login([FromBody] Login login)
        {
            var identity = GetIdentity(login.Email, login.Password);

            if (identity == null)
            {
                return BadRequest(new { errorText = "Invalid username or password." });
            }

            var now = DateTime.UtcNow;  
            // создаем JWT-токен
            var jwt = new JwtSecurityToken(
                issuer: AuthOptions.ISSUER,
                audience: AuthOptions.AUDIENCE,
                claims: identity,
                expires: DateTime.Now.AddMinutes(AuthOptions.LIFETIME),
                signingCredentials: new SigningCredentials(AuthOptions.GetSymmetricSecurityKey(), SecurityAlgorithms.HmacSha256)
            );

            var encodedJwt = new JwtSecurityTokenHandler().WriteToken(jwt);

            return Ok(new AuthenticatedResponse { Token = encodedJwt });
        }

        private List<Claim> GetIdentity(string email, string password)
        {
            Person person = _context.Persons.FirstOrDefault(x => x.Email == email && x.Password == password);

            if (person != null)
            {
                var claims = new List<Claim>
                {
                    new Claim(ClaimsIdentity.DefaultNameClaimType, person.Email),
                    new Claim(ClaimsIdentity.DefaultRoleClaimType, person.Role)
                };

                //ClaimsIdentity claimsIdentity = new ClaimsIdentity (
                //    claims, 
                //    "Token", 
                //    ClaimsIdentity.DefaultNameClaimType,
                //    ClaimsIdentity.DefaultRoleClaimType
                //);

                return claims;
            }

            return null;
        }

        [HttpPost]
        [Route("register")]
        [Produces("application/json")]
        public async Task<IActionResult> Register(Login model)
        {
            //var userExists = await userManager.FindByNameAsync(model.Username);
            //if (userExists != null)
            //    return StatusCode(StatusCodes.Status500InternalServerError, new ResponseModel { Status = "Error", Message = "User already exists!" });
            //ApplicationUser user = new ApplicationUser()
            //{
            //    Email = model.Email,
            //    SecurityStamp = Guid.NewGuid().ToString(),
            //    UserName = model.Username
            //};
            //var result = await userManager.CreateAsync(user, model.Password);
            //if (!result.Succeeded)
            //    return StatusCode(StatusCodes.Status500InternalServerError, new ResponseModel
            //    {
            //        Status = "Error",
            //        Message = "User creation failed! Please check user details and try again."
            //    });
            return Ok("Ok");
        }
    }
}
