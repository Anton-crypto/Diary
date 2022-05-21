using Microsoft.AspNetCore.Mvc;
using Diary.Models;
using Microsoft.EntityFrameworkCore;
using Diary.Models;

namespace Diary.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SubscriptionsController : ControllerBase
    {
        private readonly DiaryContextDb _context;

        public SubscriptionsController(DiaryContextDb context)
        {
            _context = context;
        }

        [HttpPost]
        public async Task<ActionResult<Subscriptions>> Post(Subscriptions subscriptions)
        {
            if (subscriptions is null)
            {
                return BadRequest("Invalid client request");
            }

            subscriptions.ID = Guid.NewGuid();

            _context.Subscriptionses.Add(subscriptions);
            await _context.SaveChangesAsync();

            return Ok();
        }
        [HttpGet("{id}")]
        public async Task<ActionResult<Subscriptions>> Get(Guid id)
        {
            return null;
        }
        [HttpDelete("{id}")]
        public async Task<ActionResult<Subscriptions>> Delete(Guid id)
        {
            Subscriptions subscriptions = _context.Subscriptionses.FirstOrDefault(x => x.UserWriterID == id);

            if (subscriptions is null)
            {
                return NotFound();
            }

            _context.Subscriptionses.Remove(subscriptions);
            await _context.SaveChangesAsync();

            return Ok();
        }
    }
}
