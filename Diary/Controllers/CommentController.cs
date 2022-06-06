using Microsoft.AspNetCore.Mvc;
using Diary.Models;
using Microsoft.EntityFrameworkCore;
using Diary.General;

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
        [HttpGet("{id}")]
        [Route("message/{id}")]
        public async Task<ActionResult<IEnumerable<Message>>> Get(Guid id)
        {
            List<Message>? messages = _context.Messages
                .Where(e => e.UserID == id)
                .ToList();

            foreach (var message in messages)
            {
                if (message.IsSeen == true) break;
                message.IsSeen = true;

                _context.Messages.Update(message);
                await _context.SaveChangesAsync();
            }

            return messages == null ? NotFound() : new ObjectResult(messages);
        }
        [HttpGet("{id}")]
        [Route("count/{id}")]
        public async Task<ActionResult<string>> GetCountUnSeen(Guid id)
        {
            List<Message>? messages = _context.Messages
                .Where(e => e.UserID == id && e.IsSeen == false)
                .ToList();

            return messages == null ? NotFound() : messages.Count.ToString();
        }
        [HttpPost, DisableRequestSizeLimit]
        public async Task<ActionResult<Comment>> Post(Comment comment)
        {
            Post post = _context.Posts.Include(e => e.User).FirstOrDefault(e => e.ID == comment.PostID);
            User user  = _context.Users.FirstOrDefault(e => e.ID == comment.UserID);

            if (post is null) return StatusCode(500, " Данынй пост не найтен ");
            if (comment is null) return BadRequest(" Коментарий сформирован не правельно ");
            if (post.User is null) return StatusCode(500, " Данынй пост не найтен ");
            if (user is null) return StatusCode(500, " Пользователь оставивший комментарий не найден ");

            comment.ID = Guid.NewGuid();
            comment.TimePost = DateTime.Now;

            _context.Comments.Add(comment);
            await _context.SaveChangesAsync();

 
            MessageDiary messageDiary = new MessageDiary(_context);
            messageDiary.Send(post.User, $"Пост с заголовкой ({post.Title}), был прокомментирован пользователем по имени {user.Name}.");

            return Ok(comment);
        }
        [HttpPut]
        public async Task<ActionResult<Comment>> Put(Comment comment)
        {
            if(comment is null)
            {
                return StatusCode(500, "Данные не коректны.");
            }

            _context.Comments.Update(comment);
            await _context.SaveChangesAsync();

            Post post = _context.Posts.Include(e => e.User).FirstOrDefault(e => e.ID == comment.PostID);
            User user = _context.Users.FirstOrDefault(e => e.ID == comment.UserID);

            if (post is null) return StatusCode(500, " Данынй пост не найтен ");
            if (comment is null) return BadRequest(" Коментарий сформирован не правельно ");
            if (post.User is null) return StatusCode(500, " Данынй пост не найтен ");
            if (user is null) return StatusCode(500, " Пользователь оставивший комментарий не найден ");

            MessageDiary messageDiary = new MessageDiary(_context);
            messageDiary.Send(post.User, $"Пост с заголовкой ({post.Title}), был прокомментирован пользователем по имени {user.Name}.");

            return Ok(comment);
        }
        [HttpDelete("{id}")]
        public async Task<ActionResult<Comment>> Delete(Guid id)
        {
            Comment comment = _context.Comments.FirstOrDefault(e => e.ID == id);

            User user = _context.Users.FirstOrDefault(e => e.ID == comment.UserID);
            Post post = _context.Posts.Include(e => e.User).FirstOrDefault(e => e.ID == comment.PostID);

            if (post is null) return StatusCode(500, " Данынй пост не найтен ");
            if (comment is null) return BadRequest(" Коментарий сформирован не правельно ");
            if (post.User is null) return StatusCode(500, " Данынй пост не найтен ");
            if (user is null) return StatusCode(500, " Пользователь оставивший комментарий не найден ");

            _context.Comments.Remove(comment);
            _context.SaveChanges();

            MessageDiary messageDiary = new MessageDiary(_context);
            messageDiary.Send(post.User, $"Комментарий пользователя {user.Name} был удален к посту 1.");

            return Ok(comment);
        }
        [HttpDelete("{id}")]
        [Route("moder/{id}")]
        public async Task<ActionResult<Comment>> DeleteCommentModer(Guid id)
        {
            Comment comment = _context.Comments.FirstOrDefault(e => e.ID == id);

            User user = _context.Users.FirstOrDefault(e => e.ID == comment.UserID);
            Post post = _context.Posts.Include(e => e.User).FirstOrDefault(e => e.ID == comment.PostID);

            if (post is null) return StatusCode(500, " Данынй пост не найтен ");
            if (comment is null) return BadRequest(" Коментарий сформирован не правельно ");
            if (post.User is null) return StatusCode(500, " Данынй пост не найтен ");
            if (user is null) return StatusCode(500, " Пользователь оставивший комментарий не найден ");

            _context.Comments.Remove(comment);
            _context.SaveChanges();

            MessageDiary messageDiary = new MessageDiary(_context);
            messageDiary.Send(post.User, $"Комментарий пользователя {user.Name} был удален к посту 1.");

            return Ok(comment);
        }
    }
}
