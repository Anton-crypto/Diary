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

            _hub.Clients.All.SendAsync("TransferChartData", chats);
            return Ok(new { Message = "Request Completed" });
        }

        //public void Post (Chat caht)
        //{
        //    _context.Chats.Add(caht);
        //    _context.SaveChanges();
        //}
    }
}
