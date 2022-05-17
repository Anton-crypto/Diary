using Microsoft.AspNetCore.Mvc;
using Diary.Models;
using Microsoft.EntityFrameworkCore;

namespace Diary.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CommentController : ControllerBase
    {
        private readonly DiaryContextDb _context;

        public CommentController(DiaryContextDb context)
        {
            _context = context;
        }

        [HttpPost, DisableRequestSizeLimit]
        public async Task<ActionResult<Comment>> Post(Comment comment)
        {
            if (comment is null)
            {
                return BadRequest("Invalid client request");
            }

            comment.ID = Guid.NewGuid();
            comment.TimePost = DateTime.Now;

            _context.Comments.Add(comment);
            await _context.SaveChangesAsync();

            return Ok(comment);
        }
    }
}
