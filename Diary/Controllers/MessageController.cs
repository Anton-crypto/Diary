using Microsoft.AspNetCore.Mvc;
using Diary.Models;
using Microsoft.EntityFrameworkCore;
using Diary.General;

namespace Diary.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MessageController : ControllerBase
    {
        private readonly DiaryContextDb _context;
        private readonly IMessage _message;

        public MessageController(DiaryContextDb context, IMessage message)
        {
            _context = context;
            _message = message;
        }

        [HttpGet("{id}")]
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
    }
}
