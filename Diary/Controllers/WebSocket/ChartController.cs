using Diary.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;

namespace Diary.Controllers.WebSocket
{
    [Route("api/[controller]")]
    [ApiController]
    public class ChartController : ControllerBase
    {
        private readonly DiaryContextDb _context;
        private readonly IHubContext<ChatHub> _hub;

        public ChartController(IHubContext<ChatHub> hub, DiaryContextDb context)
        {
            _hub = hub;
            _context = context;
        }

        [HttpGet("{userId}")]
        public IActionResult Get(Guid userId)
        {
            var chats = _context.Chats.ToList();

            //_hub.Clients.All.SendAsync("TransferChartData", chats);
            return Ok(new { Message = "Request Completed" });
        }

        [HttpGet("{userFromId}&{userToId}")]
        [Route("getCats/{userFromId}&{userToId}")]
        public IActionResult GetChatsUserPeerToPeer(Guid userFromId, Guid userToId)
        {
            var chats = _context.Chats.Where(e => (e.UserFromId == userFromId && e.UserToId == userToId) 
            || (e.UserFromId == userToId && e.UserToId == userFromId)).ToList();

            //_hub.Clients.All.SendAsync("TransferChartData", chats);
            return chats is null ? NotFound() : new ObjectResult(chats); ;
        }

        [HttpPost]
        public async Task<ActionResult<Chat>> Post(Chat chat)
        {
            if (chat is null) return BadRequest("");

            chat.Id = Guid.NewGuid();

            _context.Chats.Add(chat);
            _context.SaveChanges();

            string userConnectionIdTo = ChatHub._user.FirstOrDefault(u => u.Value == chat.UserToId).Key;

            if(userConnectionIdTo is not null)
            {
                _hub.Clients.Client(userConnectionIdTo).SendAsync("getnewmessage", chat);
            }

            return chat;
        }
    }
}
