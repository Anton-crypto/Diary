using Microsoft.AspNetCore.Mvc;
using Diary.Models;
using Microsoft.EntityFrameworkCore;
using System.Net.Http.Headers;

namespace Diary.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BackUpController : ControllerBase
    {
        private readonly DiaryContextDb _context;

        public BackUpController(DiaryContextDb context)
        {
            _context = context;
        }

        [HttpGet]
        public async void Get()
        {

        }
    }
}
