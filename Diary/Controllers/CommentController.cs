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
        private readonly IMessage _message;

        public CommentController(DiaryContextDb context)
        {
            _context = context;
            _message = new MessageDiary(_context);
        }

        [HttpGet("{id}")]
        [Route("comm/{id}")]
        public async Task<ActionResult<IEnumerable<Comment>>> GetAllAsync(Guid id)
        {
            List<Comment>? comments = await _context.Comments
                .Where(e => e.PostID == id)
                .ToListAsync();

            if (comments == null) return NotFound();

            return comments == null ? NotFound() : new ObjectResult(comments);
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

            _message.Send(post.User, $"Пост с заголовкой ({post.Title}), был прокомментирован пользователем по имени {user.Name}.");

            return Ok(comment);
        }
        [HttpPut]
        public async Task<ActionResult<Comment>> Put(Comment comment)
        {
            if(comment is null)
            {
                return StatusCode(500, "Данные не коректны.");
            }

            comment.TimePost = DateTime.Now;

            _context.Comments.Update(comment);
            await _context.SaveChangesAsync();

            Post post = _context.Posts.Include(e => e.User).FirstOrDefault(e => e.ID == comment.PostID);
            User user = _context.Users.FirstOrDefault(e => e.ID == comment.UserID);

            if (post is null) return StatusCode(500, " Данынй пост не найтен ");
            if (comment is null) return BadRequest(" Коментарий сформирован не правельно ");
            if (post.User is null) return StatusCode(500, " Данынй пост не найтен ");
            if (user is null) return StatusCode(500, " Пользователь оставивший комментарий не найден ");

            _message.Send(post.User, $"Пост с заголовкой ({post.Title}), был прокомментирован пользователем по имени {user.Name}.");

            return Ok(comment);
        }
        [HttpDelete("{id}")]
        [Route("delete/{id}")]
        public async Task<ActionResult<Comment>> Delete(Guid id)
        {
            Comment comment = _context.Comments.FirstOrDefault(e => e.ID == id);

            User user = _context.Users.FirstOrDefault(e => e.ID == comment.UserID);
            Post post = _context.Posts.Include(e => e.User).FirstOrDefault(e => e.ID == comment.PostID);

            if (post is null) return StatusCode(500, " Данынй пост не найтен ");
            if (comment is null) return BadRequest(" Коментарий сформирован не правельно ");
            if (post.User is null) return StatusCode(500, " Данные о пользователе изменены и это приводи к ошибки ");
            if (user is null) return StatusCode(500, " Пользователь оставивший комментарий не найден ");

            _context.Comments.Remove(comment);
            _context.SaveChanges();

            _message.Send(post.User, $"Комментарий пользователя {user.Name} был удален к посту 1.");

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

            _message.Send(post.User, $"Комментарий пользователя {user.Name} был удален к посту 1.");

            return Ok(comment);
        }
    }
}
