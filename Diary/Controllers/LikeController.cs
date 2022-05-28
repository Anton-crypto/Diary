using Microsoft.AspNetCore.Mvc;
using Diary.Models;
using Microsoft.EntityFrameworkCore;

namespace Diary.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LikeController : ControllerBase
    {
        private readonly DiaryContextDb _context;

        public LikeController(DiaryContextDb context)
        {
            _context = context;
        }

        [HttpPost]
        public async Task<ActionResult<Like>> Post(Like like)
        {
            if (like is null)
            {
                return BadRequest("Invalid client request");
            }

            like.ID = Guid.NewGuid();
            like.TimeLike = DateTime.Now;

            _context.Likes.Add(like);
            await _context.SaveChangesAsync();

            return Ok();
        }
        [HttpDelete("{id}")]
        public async Task<ActionResult<Like>> Delete(Guid id)
        {
            Like like = _context.Likes.FirstOrDefault(x => x.ID == id);

            if (like == null)
            {
                return NotFound();
            }

            _context.Likes.Remove(like);
            await _context.SaveChangesAsync();

            return Ok();
        }
    }
}
