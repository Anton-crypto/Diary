using Microsoft.AspNetCore.Mvc;
using Diary.Models;
using Microsoft.EntityFrameworkCore;
using System.Net.Http.Headers;
using Diary.Models.SubPost;
using System.Net.Mail;
using System.Net;
using static Diary.Static.StaticClass;

namespace Diary.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ModerController : ControllerBase
    {
        private readonly DiaryContextDb _context;

        public ModerController(DiaryContextDb context)
        {
            _context = context;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Post>> Reject(Guid id)
        {
            Post post = _context
                .Posts
                .Include(e => e.User)
                .FirstOrDefault(x => x.ID == id);

            if (post == null)
            {
                return NotFound();
            }

            string message = $"<h2>" +
                $"Поздравляю вы написали заметательный пост! " +
                $"Скоро он появится в ленте у многих польхователей!</h2>";
            string email = $"{post.User.Email}";

            SendingMessagesToEmail(message, email);

            post.ValidationStatus = true;

            _context.Posts.Update(post);
            await _context.SaveChangesAsync();

            return Ok();
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<Post>> Example(Guid id)
        {
            Post post = _context
                .Posts
                .Include(e => e.User)
                .FirstOrDefault(x => x.ID == id);

            if (post == null)
            {
                return NotFound();
            }

            string message = $"<h2>" +
                $"Данный пост является не коректным! " +
                $"Если правила будут нарушены повторно вы будете заблокированны на сайте!</h2>";
            string email = $"{post.User.Email}";

            SendingMessagesToEmail(message, email);

            _context.Posts.Remove(post);
            await _context.SaveChangesAsync();

            return Ok(post);
        }

        [HttpGet("{id}")]
        [Route("blocking/{id}")]
        public async Task<ActionResult<Post>> Blocking(Guid id)
        {
            User user = _context
                .Users
                .Include(e => e.Posts)
                .FirstOrDefault(x => x.ID == id);

            if (user == null)
            {
                return NotFound();
            }

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
                .Include(e => e.Posts)
                .FirstOrDefault(x => x.ID == id);

            if (user == null)
            {
                return NotFound();
            }

            user.IsBan = true;
            user.TimeBan = DateTime.Now.AddMinutes(5);

            string message = $"<h2>" +
                $"На вашей странице была замечена подозрительная активность! " +
                $"Временно вы не сможете размешять посты и коментировать записи!</h2>";

            string email = $"{user.Email}";

            SendingMessagesToEmail(message, email);

            _context.Users.Update(user);
            await _context.SaveChangesAsync();

            return Ok();
        }
    }
}
