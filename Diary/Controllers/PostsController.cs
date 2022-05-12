using Microsoft.AspNetCore.Mvc;
using Diary.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;

namespace Diary.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PostsController : ControllerBase
    {
        private readonly DiaryContextDb _context;

        public PostsController(DiaryContextDb context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Post>>> Get()
        {
            return new ObjectResult(await _context.Posts.Include(p => p.User).ToListAsync());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Post>> Get(Guid id)
        {
            Post post = await _context.Posts.FirstOrDefaultAsync(x => x.ID == id);
            return post == null ? NotFound() : new ObjectResult(post);
        }

        [HttpPost]
        public async Task<ActionResult<User>> Post(Post post)
        {
            if (post == null)
            {
                return BadRequest();
            }

            _context.Posts.Add(post);
            await _context.SaveChangesAsync();
            return Ok(post);
        }

        [HttpPut]
        public async Task<ActionResult<User>> Put(Post post)
        {
            if (post == null)
            {
                return BadRequest();
            }
            if (!_context.Posts.Any(x => x.ID == post.ID))
            {
                return NotFound();
            }

            _context.Update(post);
            await _context.SaveChangesAsync();
            return Ok(post);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<Post>> Delete(Guid id)
        {
            Post post = _context.Posts.FirstOrDefault(x => x.ID == id);
            if (post == null)
            {
                return NotFound();
            }
            _context.Posts.Remove(post);
            await _context.SaveChangesAsync();
            return Ok(post);
        }
    }
}
