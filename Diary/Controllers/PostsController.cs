using Microsoft.AspNetCore.Mvc;
using Diary.Models;
using Microsoft.EntityFrameworkCore;
using System.Net.Http.Headers;
using Diary.Models.SubPost;
using System.Net.Mail;
using System.Net;

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
                List<Post>? posts = _context.Posts.Include(p => p.User).ToList();

            foreach (var post in posts)
            {
                List<PostText>? postText = _context.PostTexts.Where(x => x.PostID == post.ID).ToList();
                List<PostVidio>? postVidio = _context.PostVidios.Where(x => x.PostID == post.ID).ToList();
                List<PostImage>? postImage = _context.PostImages.Where(x => x.PostID == post.ID).ToList();
                List<Comment>? comment = _context.Comments.Where(x => x.PostID == post.ID).ToList();
                List<Like>? likes = _context.Likes.Where(x => x.PostID == post.ID).ToList();
                List<Saved>? saveds = _context.Saveds.Where(x => x.PostID == post.ID).ToList();

                if (postText != null) post.PostTexts = postText;
                if (postVidio != null) post.PostVidios = postVidio;
                if (postImage != null) post.PostImages = postImage;
                if (comment != null) post.Comments = comment;
                if (likes != null) post.Likes = likes;
                if (saveds != null) post.Saveds = saveds;
            }


            return posts == null ? NotFound() : new ObjectResult(posts);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Post>> Get(Guid id)
        {
            Post? post = _context.Posts.Include(p => p.User).FirstOrDefault(x => x.ID == id);

            List<PostText>? postText = _context.PostTexts.Where(x => x.PostID == post.ID).ToList();
            List<PostVidio>? postVidio = _context.PostVidios.Where(x => x.PostID == post.ID).ToList();
            List<PostImage>? postImage = _context.PostImages.Where(x => x.PostID == post.ID).ToList();
            List<Comment>? comment = _context.Comments.Where(x => x.PostID == post.ID).ToList();
            List<Like>? likes = _context.Likes.Where(x => x.PostID == post.ID).ToList();
            List<Saved>? saveds = _context.Saveds.Where(x => x.PostID == post.ID).ToList();

            if (postText != null) post.PostTexts = postText;
            if (postVidio != null) post.PostVidios = postVidio;
            if (postImage != null) post.PostImages = postImage;
            if (comment != null) post.Comments = comment;
            if (likes != null) post.Likes = likes;
            if (saveds != null) post.Saveds = saveds;

            return post == null ? NotFound() : new ObjectResult(post);
        }
        [HttpGet("{id}")]
        [Route("mypost/{id}")]
        public async Task<ActionResult<Post>> GetMyPost(Guid id)
        {
            List<Post> posts = _context.Posts
                .Include(p => p.User)
                .Include(t => t.PostTexts)
                .Include(v => v.PostVidios)
                .Include(i => i.PostImages)
                .Include(c => c.Comments)
                .Include(l => l.Likes)
                .Include(s => s.Saveds)
                .Where(x => x.UserID == id).ToList();

            return posts is null ? NotFound() : new ObjectResult(posts);
        }
        [HttpGet("{id}")]
        [Route("subscriptions/{id}")]
        public async Task<ActionResult<Post>> GetPostSubscriptions (Guid id)
        {
            List<Post> posts = _context.Posts
                .Include(p => p.User)
                .Include(t => t.PostTexts)
                .Include(v => v.PostVidios)
                .Include(i => i.PostImages)
                .Include(c => c.Comments)
                .Include(l => l.Likes)
                .Include(s => s.Saveds)
                .Where(u => u.User.Subscribers.Any(u => u.UserWriterID == id)).ToList();

            return posts is null ? NotFound() : new ObjectResult(posts);
        }

        [HttpPost, DisableRequestSizeLimit]
        public async Task<ActionResult<Post>> Post()
        {
            try
            {
                Post post = new Post();

                post.ID = Guid.NewGuid();
                post.TimePost = DateTime.Now;
                post.Title = "";

                var formCollection = await Request.ReadFormAsync();

                var fileList = formCollection.Files.ToList();
                var userItemList = formCollection.Keys.ToList();

                foreach (var item in userItemList)
                {
                    if(item.Split('-')[0] == "title")
                    {
                        post.Title = formCollection[item];
                    }
                    if (item.Split('-')[0] == "email")
                    {
                        var email = formCollection[item].ToString();
                        User user = await _context.Users.FirstOrDefaultAsync(x => x.Email == email);
                        if (user == null) return StatusCode(500, $"Internal server error");

                        post.UserID = user.ID;

                        break;
                    }
                }

                _context.Posts.Add(post);
                await _context.SaveChangesAsync();

                foreach (var item in userItemList)
                {
                    var text = item.Split('-');
                    if(text.Length <= 0) return StatusCode(500, $"Internal server error");
                    switch (text[0])
                    {
                        case "text": 
                            {
                                PostText postText = new PostText
                                {
                                    ID = Guid.NewGuid(),
                                    Text = formCollection[item],
                                    PostID = post.ID,
                                    DisplayNumber = text[1].ToString()

                                };

                                _context.PostTexts.Add(postText);
                                await _context.SaveChangesAsync();

                                break; 
                            }
                        case "vidio": 
                            {
                                PostVidio postVidio = new PostVidio
                                {
                                    ID = Guid.NewGuid(),
                                    VidioUrl = formCollection[item],
                                    PostID = post.ID,
                                    DisplayNumber = text[1].ToString()
                                };

                                _context.PostVidios.Add(postVidio);
                                await _context.SaveChangesAsync();

                                break;
                            }
                        default: break;
                    }
                }

                var folderName = Path.Combine("Resources", "Images");
                var pathToSave = Path.Combine(Directory.GetCurrentDirectory(), folderName);

                foreach (var item in fileList)
                {
                    if (item.Length <= 0)
                    {
                        break;
                    }

                    var fileName = Guid.NewGuid().ToString() + "." +
                        item.ContentType.Trim('"').Split('/')[1];

                    var fullPath = Path.Combine(pathToSave, fileName);
                    var dbPath = Path.Combine(folderName, fileName);

                    using (var stream = new FileStream(fullPath, FileMode.Create))
                    {
                        item.CopyTo(stream);
                    }

                    PostImage postImage = new PostImage
                    {
                        ID = Guid.NewGuid(),
                        ImgUrl = dbPath,
                        PostID = post.ID,
                        DisplayNumber = item.Name.Split('-')[1]
                    };

                    _context.PostImages.Add(postImage);
                    await _context.SaveChangesAsync();
                }

                _context.Posts.Update(post);
                await _context.SaveChangesAsync();

                List<Subscriptions> subscriptions = _context.Subscriptionses.Where(x => x.UserSubscriptionID == post.UserID).ToList();
                User userSub = _context.Users.FirstOrDefault(x => x.ID == post.UserID);


                foreach (var subscription in subscriptions)
                {
                    try
                    {
                        User user = await _context.Users.FirstOrDefaultAsync(x => x.ID == subscription.UserWriterID);

                        MailAddress from = new MailAddress("toni_naumov_1990@mail.ru", "Diary");
                        MailAddress to = new MailAddress(user.Email);
                        MailMessage m = new MailMessage(from, to);

                        m.Subject = "Оповещение";
                        m.Body = $"<h2>У пользователя по именем {userSub.Name} gявился новый пост !</h2>";
                        m.IsBodyHtml = true;

                        SmtpClient smtp = new SmtpClient("smtp.mail.ru", 587);

                        smtp.Credentials = new NetworkCredential("toni_naumov_1990", "999-333-111-Ked-139_L");
                        smtp.EnableSsl = true;
                        smtp.Send(m);
                    }
                    catch (Exception)
                    {
                        throw;
                    }
                }

                return Ok(post);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex}");
            }
        }
        [HttpPost]
        [Route("comment")]
        public async Task<ActionResult<Post>> PostComment(Comment comment)
        {
            if (comment == null) return StatusCode(500, $"Internal server error");

            comment.ID = Guid.NewGuid();

            await _context.Comments.AddAsync(comment);
            await _context.SaveChangesAsync();

            return Ok();
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
