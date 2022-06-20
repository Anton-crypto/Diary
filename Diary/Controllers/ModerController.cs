using Microsoft.AspNetCore.Mvc;
using Diary.Models;
using Microsoft.EntityFrameworkCore;
using System.Net.Http.Headers;
using Diary.Models.SubPost;
using System.Net.Mail;
using System.Net;
using static Diary.Static.StaticClass;
using Diary.General;
using Microsoft.AspNetCore.Authorization;
using Diary.Models.IdentityModels;

namespace Diary.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ModerController : ControllerBase
    {
        private readonly DiaryContextDb _context;
        private readonly IdentityContextDb _contextIdentity;
        private readonly IMessage _messageDiary;
        private readonly IMessage _messageMail;

        public ModerController(DiaryContextDb context, IdentityContextDb _contextIdentity)
        {
            this._context = context;
            this._contextIdentity = _contextIdentity;
            _messageDiary = new MessageDiary(context);
            this._messageMail = new MessageMail();
        }

        [HttpGet()]
        [Route("getLoges")]
        public async Task<ActionResult<PostCheckLogs>> GetLogs()
        {
            List<PostCheckLogs> logs = _context.PostCheckLogs
                .Include(e => e.User)
                .Include(e => e.Post)
                .ToList();

            return logs == null ? NotFound() : new ObjectResult(logs);
        }

        [HttpGet("{id}")]
        [Route("reject/{id}")]
        public async Task<ActionResult<string>> Reject(Guid id)
        {
            Post post = _context
                .Posts
                .Include(e => e.User)
                .FirstOrDefault(x => x.ID == id);

            if (post == null)
            {
                return NotFound();
            }

            _messageDiary.Send(post.User, "Поздравляю вы написали заметательный пост!");

            post.ValidationStatus = true;
            post.NSFW = false;

            _context.Posts.Update(post);
            await _context.SaveChangesAsync();

            return Ok("Ok");
        }

        [HttpGet("{id}")]
        [Route("rejectNSFW/{id}")]
        public async Task<ActionResult<string>> RejectNSFW(Guid id)
        {
            Post post = _context
                .Posts
                .Include(e => e.User)
                .FirstOrDefault(x => x.ID == id);

            if (post == null)
            {
                return NotFound();
            }

            _messageDiary.Send(post.User, "Поздравляю вы написали заметательный пост!");

            post.ValidationStatus = true;
            post.NSFW = true;

            _context.Posts.Update(post);
            await _context.SaveChangesAsync();

            return Ok("Ok");
        }
        [HttpGet("{id}")]
        [Route("ToggleNSFW/{id}")]
        public async Task<ActionResult<bool>> ToggleNSFW(Guid id)
        {
            Post post = _context
                .Posts
                .Include(e => e.User)
                .FirstOrDefault(x => x.ID == id);

            if (post == null)
            {
                return NotFound();
            }

            post.NSFW = !post.NSFW;
            _messageDiary.Send(post.User, $"Статус поста был изменен на NSFW({post.NSFW})");

            _context.Posts.Update(post);
            await _context.SaveChangesAsync();

            return Ok(post.NSFW);
        }

        [HttpDelete("{id}")]
        [Route("postdel/{id}")]
        public async Task<ActionResult<string>> Example(Guid id)
        {
            var post = _context.Posts
                .Include(t => t.PostTexts)
                .Include(v => v.PostVidios)
                .Include(i => i.PostImages)
                .Include(c => c.Comments)
                .Include(l => l.Likes)
                .Include(s => s.User)
                .Include(s => s.Saveds)
                .FirstOrDefault(e => e.ID == id);

            if (post == null)
            {
                return NotFound();
            }

            _messageDiary.Send(post.User, "Данный пост является не коректным! И был отклонен.");

            post.PostTexts.Clear();
            post.PostVidios.Clear();
            post.PostImages.Clear();
            post.Comments.Clear();
            post.Likes.Clear();
            post.Saveds.Clear();

            _context.Posts.Remove(post);
            await _context.SaveChangesAsync();

            return Ok("ok");
        }

        [HttpGet("{id}")]
        [Route("blocking/{id}")]
        public async Task<ActionResult<Post>> Blocking(Guid id)
        {
            User user = _context.Users.FirstOrDefault(x => x.ID == id);
            if (user is null) return NotFound();

            user.IsBlok = true;

            string message = $"<h2>" +
                $"На вашей странице была замечена подозрительная активность! " +
                $"Ваш аккаунт был заблокирован!</h2>";

            string email = $"{user.Email}";

            SendingMessagesToEmail(message, email);

            _context.Users.Update(user);
            await _context.SaveChangesAsync();

            return Ok();
        }
        [HttpGet("{id}")]
        [Route("ban/{id}")]
        public async Task<ActionResult<Post>> Ban(Guid id)
        {
            User user = _context
                .Users
                .FirstOrDefault(x => x.ID == id);

            if (user == null)
            {
                return NotFound();
            }

            user.IsBan = true;
            user.TimeBan = DateTime.Now.AddDays(25);

            string message = $"На вашей странице была замечена подозрительная активность! " +
                $"Временно вы не сможете размешять посты и коментировать записи!";

            _messageDiary.Send(user, message);

            _context.Users.Update(user);
            await _context.SaveChangesAsync();

            return Ok();
        }

        [HttpGet("{id}")]
        [Route("ban/delete/{id}")]
        public async Task<ActionResult<User>> BanDeleteAsync(Guid id)
        {
            User user = _context.Users.FirstOrDefault(x => x.ID == id);
            if (user == null) return NotFound();

            user.IsBan = false;
            user.TimeBan = null;

            _messageDiary.Send(user, "Простите произошла ошибка Бан был снят.");

            _context.Users.Update(user);
            await _context.SaveChangesAsync();

            return Ok(user);
        }

        [HttpGet("{id}")]
        [Route("blocking/delete/{id}")]
        public async Task<ActionResult<User>> BlockingDeleteAsync(Guid id)
        {
            User user = _context.Users.FirstOrDefault(x => x.ID == id);
            if (user is null) return NotFound(); 

            user.IsBlok = false;

            _context.Users.Update(user);
            await _context.SaveChangesAsync();

            string message = $"<h2>Портал приносит извинения. Блокировка произошла по ошибке.</h2>";

            string email = $"{user.Email}";

            SendingMessagesToEmail(message, email);

            return Ok(user);
        }

        [HttpDelete("{id}"), Authorize]
        [Route("delete/{id}")]
        public async Task<ActionResult<string>> Delete(Guid id)
        {
            var user = _context.Users.FirstOrDefault(e => e.ID == id);
            var person = _contextIdentity.Persons.FirstOrDefault(e => e.Email == user.Email);

            _context.Users.Remove(user);
            _context.SaveChanges();

            _contextIdentity.Persons.Remove(person);
            _contextIdentity.SaveChanges();

            return Ok("");
        }       

    }
}
