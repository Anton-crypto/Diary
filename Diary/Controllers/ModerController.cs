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
    public class ModerController : ControllerBase
    {
        private readonly DiaryContextDb _context;
        private readonly MessageDiary messageDiary;

        public ModerController(DiaryContextDb context)
        {
            _context = context;
            this.messageDiary = new MessageDiary(context);
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

            messageDiary.Send(post.User, "Поздравляю вы написали заметательный пост!");

            post.ValidationStatus = true;

            _context.Posts.Update(post);
            await _context.SaveChangesAsync();

            return Ok("Ok");
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<string>> Example(Guid id)
        {
            Post post = _context
                .Posts
                .Include(e => e.User)
                .FirstOrDefault(x => x.ID == id);

            if (post == null)
            {
                return NotFound();
            }

            messageDiary.Send(post.User, "Данный пост является не коректным!");

            _context.Posts.Remove(post);
            await _context.SaveChangesAsync();

            return Ok("ok");
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
