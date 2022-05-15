using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using Diary.Models.IdentityModels;
using Diary.Models;
using Diary.Identity;
using System.Web;
using Diary.Services;
using System.Security.Cryptography;
using System.Text;

namespace Diary.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : Controller
    {
        private readonly IdentityContextDb _context;
        private readonly DiaryContextDb _contextDiary;
        private readonly ITokenService _tokenService;

        public AuthController(IdentityContextDb context, ITokenService tokenService, DiaryContextDb contextDiary)
        {
            _context = context ?? throw new ArgumentNullException(nameof(context));
            _contextDiary = contextDiary ?? throw new ArgumentNullException(nameof(contextDiary));
            _tokenService = tokenService ?? throw new ArgumentNullException(nameof(tokenService));
        }

        [HttpPost]
        [Route("login")]
        public IActionResult Login([FromBody] Login login)
        {
            Person user = _context.Persons.FirstOrDefault(x => x.Email == login.Email && x.Password == GetHash(login.Password));

            if (user is null) // Поправить ошибку
            {
                return BadRequest("Invalid client request");
            }

            var claims = new List<Claim>
            {
                new Claim(ClaimsIdentity.DefaultNameClaimType, user.Email),
                new Claim(ClaimsIdentity.DefaultRoleClaimType, user.Role)
            };

            var accessToken = _tokenService.GenerateAccessToken(claims);
            var refreshToken = _tokenService.GenerateRefreshToken();

            user.RefreshToken = refreshToken;
            user.RefreshTokenExpiryTime = DateTime.Now.AddDays(7);

            _context.SaveChanges();

            return Ok(new AuthenticatedResponse
            {
                Token = accessToken,
                RefreshToken = refreshToken,
                User = user
            });
        }

        [HttpPost]
        [Route("register")]
        [Produces("application/json")]
        public async Task<IActionResult> Register(Register register)
        {
            if (register is null)
            {
                return BadRequest("Invalid client request");
            }

            Person user = _context.Persons.FirstOrDefault(x => x.Email == register.Email);

            if (user != null)
                return StatusCode(StatusCodes.Status500InternalServerError);

            var claims = new List<Claim>
            {
                new Claim(ClaimsIdentity.DefaultNameClaimType, register.Email),
                new Claim(ClaimsIdentity.DefaultRoleClaimType, "user")
            };

            var accessToken = _tokenService.GenerateAccessToken(claims);
            var refreshToken = _tokenService.GenerateRefreshToken();

            Person person = new Person {
                Id = Guid.NewGuid(),
                Email = register.Email,
                Password = GetHash(register.Password),
                Role = "user",
                RefreshToken = refreshToken,
                RefreshTokenExpiryTime = DateTime.Now.AddDays(7),
            };

            await _context.Persons.AddAsync(person);
            _context.SaveChanges();


            User userDiary = new User
            {
                ID = Guid.NewGuid(),
                Email = register.Email,
                Name = register.NikeName,
                Icon = "",
                Font = "",
                About = "",
                Gender = "",
            };

            await _contextDiary.Users.AddAsync(userDiary);
            _contextDiary.SaveChanges();

            return Ok(new AuthenticatedResponse
            {
                Token = accessToken,
                RefreshToken = refreshToken,
                User = person   
            }); ;
        }
        private string GetHash(string input)
        {
            var md5 = MD5.Create();
            var hash = md5.ComputeHash(Encoding.UTF8.GetBytes(input));

            return Convert.ToBase64String(hash);
        }
    }
}
