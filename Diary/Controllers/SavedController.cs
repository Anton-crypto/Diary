using Microsoft.AspNetCore.Mvc;
using Diary.Models;
using Microsoft.EntityFrameworkCore;
using Diary.Models.SubPost;

namespace Diary.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SavedController : ControllerBase
    {
        private readonly DiaryContextDb _context;

        public SavedController(DiaryContextDb context)
        {
            _context = context;
        }

        [HttpPost]
        public async Task<ActionResult<Saved>> Post(Saved saved)
        {
            if (saved is null)
            {
                return BadRequest("Invalid client request");
            }

            saved.ID = Guid.NewGuid();
            saved.TimeLike = DateTime.Now;

            _context.Saveds.Add(saved);
            await _context.SaveChangesAsync();

            return Ok(saved);
        }
        [HttpGet("{id}")]
        public async Task<ActionResult<Post>> Get(Guid id)
        {
            List<Saved> saveds = _context.Saveds.Where(x => x.UserID == id).ToList();
            List<Post> posts = new List<Post>();

            foreach (var saved in saveds)
            {
                Post? post = _context.Posts.Include(p => p.User).FirstOrDefault(x => x.ID == saved.PostID);

                List<PostText>? postText = _context.PostTexts.Where(x => x.PostID == post.ID).ToList();
                List<PostVidio>? postVidio = _context.PostVidios.Where(x => x.PostID == post.ID).ToList();
                List<PostImage>? postImage = _context.PostImages.Where(x => x.PostID == post.ID).ToList();
                List<Comment>? comment = _context.Comments.Where(x => x.PostID == post.ID).ToList();
                List<Like>? likes = _context.Likes.Where(x => x.PostID == post.ID).ToList();
                List<Saved>? savedsPost = _context.Saveds.Where(x => x.PostID == post.ID).ToList();

                if (postText != null) post.PostTexts = postText;
                if (postVidio != null) post.PostVidios = postVidio;
                if (postImage != null) post.PostImages = postImage;
                if (comment != null) post.Comments = comment;
                if (likes != null) post.Likes = likes;
                if (savedsPost != null) post.Saveds = savedsPost;

                posts.Add(post);
            }

            return posts == null ? NotFound() : new ObjectResult(posts);
        }
        [HttpDelete("{id}")]
        public async Task<ActionResult<Saved>> Delete(Guid id)
        {
            Saved saved = _context.Saveds.FirstOrDefault(x => x.ID == id);

            if (saved == null)
            {
                return NotFound();
            }

            _context.Saveds.Remove(saved);
            await _context.SaveChangesAsync();

            return Ok(saved);
        }
    }
}
