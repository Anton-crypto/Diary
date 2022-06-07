using Microsoft.AspNetCore.Mvc;
using Diary.Models;
using Microsoft.EntityFrameworkCore;
using System.Net.Http.Headers;
using Diary.Models.SubPost;
using System.Net.Mail;
using System.Net;
using static Diary.Static.StaticClass;
using Diary.General;

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
        [HttpGet("{id}")]
        [Route("update/{id}")]
        public async Task<ActionResult<IEnumerable<Post>>> GetUpdatePostAsync(Guid id)
        {
            Post? post = await _context.Posts
                .Include(p => p.User)
                .Include(t => t.PostTexts)
                .Include(v => v.PostVidios)
                .Include(i => i.PostImages)
                .Include(c => c.Comments)
                .Include(l => l.Likes)
                .Include(s => s.Saveds)
                .FirstOrDefaultAsync(x => x.ID == id);

            return post == null ? NotFound() : new ObjectResult(post);
        }
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Post>>> Get()
        {
            List<Post>? posts = _context.Posts
                .Include(p => p.User)
                .Include(t => t.PostTexts)
                .Include(v => v.PostVidios)
                .Include(i => i.PostImages)
                .Include(c => c.Comments)
                .Include(l => l.Likes)
                .Include(s => s.Saveds)
                .Where(e => e.ValidationStatus == true)
                .ToList();

            return posts == null ? NotFound() : new ObjectResult(posts);
        }
        [HttpGet("{pagination}")]
        [Route("pagination/{pagination}")]
        public async Task<ActionResult<IEnumerable<Post>>> GetPagination( string pagination )
        {
            List<Post>? posts = _context.Posts
                .Include(p => p.User)
                .Skip(int.Parse(pagination) * 2)
                .Take(2)
                .Include(t => t.PostTexts)
                .Include(v => v.PostVidios)
                .Include(i => i.PostImages)
                .Include(c => c.Comments)
                .Include(l => l.Likes)
                .Include(s => s.Saveds)
                .Where(e => e.ValidationStatus == true)
                .ToList();

            return posts == null ? NotFound() : new ObjectResult(posts);
        }
        [HttpGet("{id}")]
        public async Task<ActionResult<Post>> Get(Guid id)
        {
            Post? post = _context.Posts
                .Include(p => p.User)
                .Include(t => t.PostTexts)
                .Include(v => v.PostVidios)
                .Include(i => i.PostImages)
                .Include(c => c.Comments)
                .Include(l => l.Likes)
                .Include(s => s.Saveds)
                .Where(e => e.ValidationStatus == true)
                .FirstOrDefault(x => x.ID == id);

            return post == null ? NotFound() : new ObjectResult(post);
        }
        [HttpGet]
        [Route("moder")]
        public async Task<ActionResult<Post>> GetPostModerAsync()
        {
            List<Post> posts = await _context.Posts
                .Include(p => p.User)
                .Include(t => t.PostTexts)
                .Include(v => v.PostVidios)
                .Include(i => i.PostImages)
                .Include(c => c.Comments)
                .Include(l => l.Likes)
                .Include(s => s.Saveds)
                .Where(x => x.ValidationStatus == false).ToListAsync();

            return posts is null ? NotFound() : new ObjectResult(posts);
        }
        [HttpGet("{id}")]
        [Route("mypost/{id}")]
        public async Task<ActionResult<Post>> GetMyPostAsync(Guid id)
        {
            List<Post> posts = await _context.Posts
                .Include(p => p.User)
                .Include(t => t.PostTexts)
                .Include(v => v.PostVidios)
                .Include(i => i.PostImages)
                .Include(c => c.Comments)
                .Include(l => l.Likes)
                .Include(s => s.Saveds)
                .Where(x => x.UserID == id).ToListAsync();

            return posts is null ? NotFound() : new ObjectResult(posts);
        }
        [HttpPost]
        [Route("search")]
        public async Task<ActionResult<Post>> GetPostSubscriptions(Search search)
        {

            string nameAuthor = search.NameAuthor;
            string bodySearch = search.BodySearch;
            int rating = 0;

            if (search.Rating != "")
            {
                rating = int.Parse(search.Rating);
            }

            List<Post> posts = _context.Posts
                .Include(p => p.User)
                .Include(t => t.PostTexts)
                .Include(v => v.PostVidios)
                .Include(i => i.PostImages)
                .Include(c => c.Comments)
                .Include(l => l.Likes)
                .Include(s => s.Saveds)
                .Where((e) =>
                    EF.Functions.Like(e.User.Name.ToLower(), $"%{nameAuthor.ToLower()}%") && 
                    (e.Comments.Count + e.Likes.Count + e.Saveds.Count) * 100 >= rating &&
                    e.ValidationStatus == true &&
                    EF.Functions.Like(e.Title.ToLower(), $"%{bodySearch.ToLower()}%")
                ).
                ToList();

            string[] tegs = search.Tegs.Split(',');

            List<Post> newPosts = new List<Post>();

            foreach (var item in posts)
            {
                string[] tegsPost = item.Tegs.Split(',');
                int count = 0;

                foreach (var teg in tegs)
                {
                    
                    if(Array.Exists(tegsPost, e => e == teg))
                    {
                        count++;
                    }
                }
                if(count == tegs.Length)
                {
                    newPosts.Add(item);
                }
            }
            if(newPosts.Count != 0)
            {
                posts = newPosts;
            }

            string[] type = search.TypePost.Split(',');

            foreach (var item in type)
            {
                if(item == "текстовые")
                {
                    posts = posts.Where(e => e.PostTexts.Count > 0).ToList();
                } else if(item == "картинка")
                {
                    posts = posts.Where(e => e.PostImages.Count > 0).ToList();
                } else if(item == "видео")
                {
                    posts = posts.Where(e => e.PostVidios.Count > 0).ToList();
                } else if (item == "[ мое ]")
                {
                    posts = posts.Where(e => e.User.ID == Guid.Parse(search.UserID)).ToList();
                } else if (item == "NSFW")
                {
                    posts = posts.Where(e => e.Status == "NSFW").ToList();
                }

            }

            if(search.DataType == "7")
            {
                DateTime date = new DateTime();
                date.AddDays(-7);
                posts = posts.Where(e => e.TimePost > date).ToList();

            } else if (search.DataType == "30")
            {
                DateTime date = new DateTime();
                date.AddDays(-30);
                posts = posts.Where(e => e.TimePost > date).ToList();

            } else if (search.DataType != "max")
            {
                string[] dateString = search.DataType.Split('.');
                DateTime date = new DateTime(int.Parse(dateString[2]), int.Parse(dateString[1]), int.Parse(dateString[0]));

                posts = posts.Where(e => e.TimePost.ToShortDateString() == date.ToShortDateString()).ToList();

            }

            return posts is null ? NotFound() : new ObjectResult(posts);
        }
        [HttpPost, DisableRequestSizeLimit]
        public async Task<ActionResult<Post>> Post()
        {
            try
            {
                Post post = new Post();
                User user = null;

                post.ID = Guid.NewGuid();
                post.TimePost = DateTime.Now;
                post.Title = "";
                post.ValidationStatus = false;

                var formCollection = await Request.ReadFormAsync();

                var fileList = formCollection.Files.ToList();
                var userItemList = formCollection.Keys.ToList();



                foreach (var item in userItemList) // Добавить else 
                {
                    if (item == "title")
                    {
                        string title = formCollection[item];
                        post.Title = title;
                    }
                    else if (item == "email")
                    {
                        user = await _context.Users.FirstOrDefaultAsync(x => x.Email == formCollection[item].ToString());
                    }
                    else if (item == "teg")
                    {
                        string tegs = formCollection[item];
                        post.Tegs = tegs;
                    }
                }

                if (user == null) return StatusCode(500, $"Полькователь не найден");
                post.UserID = user.ID;

                _context.Posts.Add(post);
                await _context.SaveChangesAsync();

                List<(string, string)> massId = new List<(string, string)>();

                foreach (var item in userItemList)
                {
                    var text = item.Split('-');
                    if(text.Length <= 0) return StatusCode(500, $"Формат именования файлов не соблюдается");
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

                List<Subscriptions> subscriptions = _context.Subscriptionses.Where(x => x.UserWriterID == post.UserID).ToList();

                foreach (var subscription in subscriptions)
                {
                    User userSubscription = await _context.Users.FirstOrDefaultAsync(x => x.ID == subscription.UserSubscriptionID);
                    if (userSubscription is null) break;

                    MessageDiary messageDiary = new MessageDiary(_context);
                    messageDiary.Send(userSubscription, $"<h2>У пользователя по именем ( {user.Name} ) появился новый пост !</h2>");
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
        [HttpPut, DisableRequestSizeLimit]
        public async Task<ActionResult<Post>> Put()
        {
            try
            {
                var formCollection = await Request.ReadFormAsync();

                var fileList = formCollection.Files.ToList();
                var userItemList = formCollection.Keys.ToList();

                Post post = new Post();

                string title = "";
                string tegs = "";

                foreach (var item in userItemList)
                {
                    if (item == "id")
                    {
                        post = await _context
                            .Posts
                            .Include(t => t.PostTexts)
                            .Include(v => v.PostVidios)
                            .Include(i => i.PostImages)
                            .FirstOrDefaultAsync(x => x.ID == Guid.Parse(formCollection[item].ToString()));
                    }
                    else if (item == "title")
                    {
                        title = formCollection[item];
                    }
                    else if (item == "teg")
                    {
                        tegs = formCollection[item];
                    }
                }

                if(post is null)
                {
                    return StatusCode(500, $"Internal server error");
                }

                foreach (var item in post.PostTexts)
                {
                    _context.PostTexts.Remove(item);
                    await _context.SaveChangesAsync();
                }
                foreach (var item in post.PostVidios)
                {
                    _context.PostVidios.Remove(item);
                    await _context.SaveChangesAsync();
                }

                post.Title = title;
                post.Tegs = tegs;

                List<(string, string)> massId = new List<(string, string)>();

                foreach (var item in userItemList)
                {
                    var text = item.Split('-');
                    if (text.Length <= 0) return StatusCode(500, $"Internal server error");
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
                        case "img":
                            {
                                massId.Add((formCollection[item], text[1].ToString()));
                                break;
                            }
                        default: break;
                    }
                }

                List<PostImage> PostImg = new List<PostImage>();

                foreach (var item in massId)
                {
                    var buffer = post.PostImages.FirstOrDefault(x => x.ID == Guid.Parse(item.Item1));
                    if (buffer is not null)
                    {
                        buffer.DisplayNumber = item.Item2;
                        PostImg.Add(buffer);

                        _context.PostImages.Update(buffer);
                        await _context.SaveChangesAsync();
                    }
                }

                if (post.PostImages.Count > 0)
                {
                    foreach (var item in post.PostImages)
                    {
                        if (PostImg.FirstOrDefault(x => x.ID == item.ID) == null)
                        {
                            _context.PostImages.Remove(item);
                            await _context.SaveChangesAsync();
                        }
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

                return Ok(post);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex}");
            }
        }
        [HttpDelete("{id}")]
        public async Task<ActionResult<Post>> Delete(Guid id)
        {
            Post post = _context.Posts
                .Include(t => t.PostTexts)
                .Include(v => v.PostVidios)
                .Include(i => i.PostImages)
                .Include(c => c.Comments)
                .Include(l => l.Likes)
                .Include(s => s.Saveds)
                .FirstOrDefault(x => x.ID == id);

            if (post == null)
            {
                return NotFound();
            }

            _context.Posts.Remove(post);
            await _context.SaveChangesAsync();

            return Ok(post);
        }
        [HttpGet]
        [Route("hotter")]
        public async Task<ActionResult<Post>> GetHotPostAsync()
        {
            List<Post> posts = await _context.Posts
                .Include(p => p.User)
                .Include(t => t.PostTexts)
                .Include(v => v.PostVidios)
                .Include(i => i.PostImages)
                .Include(c => c.Comments)
                .Include(l => l.Likes)
                .Include(s => s.Saveds)
                .Where(x => x.TimePost.Day == DateTime.Now.Day && x.ValidationStatus == true).ToListAsync();

            return posts is null ? NotFound() : new ObjectResult(posts);
        }
        [HttpGet]
        [Route("best")]
        public async Task<ActionResult<Post>> GetBestPostAsync()
        {
            List<Post> posts = await _context.Posts
                .Include(p => p.User)
                .Include(t => t.PostTexts)
                .Include(v => v.PostVidios)
                .Include(i => i.PostImages)
                .Include(c => c.Comments)
                .Include(l => l.Likes)
                .Include(s => s.Saveds)
                .Where(e => (e.Comments.Count + e.Likes.Count + e.Saveds.Count) * 100 >= 5000 && e.ValidationStatus == true).ToListAsync();

            return posts is null ? NotFound() : new ObjectResult(posts);
        }
        [HttpGet]
        [Route("fresh")]
        public async Task<ActionResult<Post>> GetFreshPostAsync()
        {
            List<Post> posts = await _context.Posts
                .Include(p => p.User)
                .Include(t => t.PostTexts)
                .Include(v => v.PostVidios)
                .Include(i => i.PostImages)
                .Include(c => c.Comments)
                .Include(l => l.Likes)
                .Include(s => s.Saveds)
                .Where(x => x.TimePost.Month == DateTime.Now.Month && x.ValidationStatus == true).ToListAsync();

            return posts is null ? NotFound() : new ObjectResult(posts);
        }
        [HttpGet("{id}")]
        [Route("subscriptions/{id}")]
        public async Task<ActionResult<Post>> GetPostSubscriptionsAsync(Guid id)
        {
            List<Post> posts = await _context.Posts
                .Include(p => p.User)
                .Include(t => t.PostTexts)
                .Include(v => v.PostVidios)
                .Include(i => i.PostImages)
                .Include(c => c.Comments)
                .Include(l => l.Likes)
                .Include(s => s.Saveds)
                .Where(u => u.User.Subscribers.Any(u => u.UserWriterID == id) && u.ValidationStatus == true).ToListAsync();

            return posts is null ? NotFound() : new ObjectResult(posts);
        }
        [HttpGet("{email}")]
        [Route("coll/{email}")]
        public async Task<ActionResult<Post>> GetRecommendationsAsync(string email)
        {
            User user = _context.Users.FirstOrDefault(e => e.Email == email);  // Поправить

            List<Post> posts = _context.Posts
                .Include(e => e.User)
                .Include(e => e.Likes)
                .Where(e => 
                    e.ValidationStatus == true &&
                    e.Likes.Any(u => u.TimeLike.Day == DateTime.Now.Day) &&
                    e.Likes.Any(u => u.UserID == user.ID) &&
                    e.UserID != user.ID
                )
                .ToList();

            return posts is null ? NotFound() : new ObjectResult(posts);
        }
    }
}
