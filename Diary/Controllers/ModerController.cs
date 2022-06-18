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

            _messageDiary.Send(post.User, "Данный пост является не коректным!");

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

            //string message = $"<h2>" +
            //    $"На вашей странице была замечена подозрительная активность! " +
            //    $"Ваш аккаунт был заблокирован!</h2>";

            //string email = $"{user.Email}";

            //SendingMessagesToEmail(message, email);

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
            user.TimeBan = DateTime.Now.AddMinutes(5);

            //System.Timers.Timer timer = new(interval: 1000 * 60 );
            //timer.Elapsed += (sender, e) => TimerBant(user, timer );
            //timer.Start();

            string message = $"На вашей странице была замечена подозрительная активность! " +
                $"Временно вы не сможете размешять посты и коментировать записи!";

            _messageDiary.Send(user, message);

            _context.Users.Update(user);
            await _context.SaveChangesAsync();

            return Ok();
        }
        //private void TimerBant ( User user, System.Timers.Timer timer)
        //{
        //    user.IsBan = false;

        //    using (DbContext db = new DbContext("DateBaseDiary")
        //    {

        //    }
        //        _context.Users.Update(user);
        //    _context.SaveChangesAsync();

        //    timer.Stop();
        //}

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
