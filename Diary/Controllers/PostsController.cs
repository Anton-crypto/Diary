using Microsoft.AspNetCore.Mvc;
using Diary.Models;
using Microsoft.EntityFrameworkCore;
using System.Net.Http.Headers;

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

        [HttpPost, DisableRequestSizeLimit]
        [Route("upload")]
        public async Task<ActionResult<Post>> Post()
        {
            try
            {
                var formCollection = await Request.ReadFormAsync();

                var file = formCollection.Files.First();
                var postForm = formCollection.Keys.ToList();

                var folderName = Path.Combine("Resources", "Images");
                var pathToSave = Path.Combine(Directory.GetCurrentDirectory(), folderName);

                if (file.Length > 0)
                {
                    var fileName = 
                        Guid.NewGuid().ToString() +
                        "." + 
                        ContentDispositionHeaderValue.Parse(file.ContentDisposition).FileName.Trim('"').Split('.')[1];


                    var fullPath = Path.Combine(pathToSave, fileName);
                    var dbPath = Path.Combine(folderName, fileName);

                    using (var stream = new FileStream(fullPath, FileMode.Create))
                    {
                        file.CopyTo(stream);
                    }

                    string title = null;
                    string bodyText = null;
                    Guid userId = new Guid();

                    foreach (var item in postForm)
                    {
                        switch (item)
                        {
                            case "title": { title = formCollection[item]; break; }
                            case "bodyText": { bodyText = formCollection[item]; break; }
                            case "userId": { userId = Guid.Parse(formCollection[item] ); break; }
                            default: break;
                        }
                    }

                    var post = new Post
                    {
                        ID = Guid.NewGuid(),
                        TimePost = DateTime.Today,
                        Title = title,
                        UserID = userId,
                    };

                    _context.Posts.Add(post);
                    await _context.SaveChangesAsync();

                    return Ok(post);
                }
                else
                {
                    return BadRequest();
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex}");
            }
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
