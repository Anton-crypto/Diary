using Microsoft.AspNetCore.Mvc;
using Diary.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;

namespace Diary.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {

        private readonly DiaryContextDb _context;

        public UserController(DiaryContextDb context)
        {
            _context = context;
        }

        [HttpGet, Authorize]
        public async Task<ActionResult<IEnumerable<User>>> Get()
        {
            return new ObjectResult(await _context.Users.ToListAsync());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<User>> Get(Guid id)
        {
            User user = await _context.Users.FirstOrDefaultAsync(x => x.ID == id);
            return user == null ? NotFound() : new ObjectResult(user);
        }
    }
}
