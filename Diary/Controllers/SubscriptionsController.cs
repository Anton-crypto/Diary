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
        public async Task<ActionResult<Subscriptions>> Post(SubM sub)
        {
            if (sub is null)
            {
                return BadRequest("Invalid client request");
            }

            Subscriptions subscriptions = new Subscriptions
            {
                ID = Guid.NewGuid(),
                UserSubscriptionID = sub.UserSubscriptionID,
                UserWriterID = sub.UserWriterID,
            };

            _context.Subscriptionses.Add(subscriptions);
            await _context.SaveChangesAsync();

            return Ok();
        }

        [HttpPost]
        [Route("getSub")]
        public async Task<ActionResult<Subscriptions>> GetAllSubscriptinPost(SubM subscriptions)
        {
            if (subscriptions is null)
            {
                return NotFound();
            }

            Subscriptions sub = _context.Subscriptionses.FirstOrDefault(x => 
                x.UserSubscriptionID == subscriptions.UserSubscriptionID && 
                x.UserWriterID == subscriptions.UserWriterID
            );

            if (sub is null)
            {
                return new Subscriptions();
            }

            return sub;
        }

        [HttpGet("{id}")]
        [Route("getAllSub/{id}")]
        public async Task<ActionResult<Subscriptions>> GetAllSubscriptin(Guid id)
        {
            List<Subscriptions> subscriptions = _context.Subscriptionses.Where(x => x.UserSubscriptionID == id).ToList();

            foreach (var sub in subscriptions)
            {
                sub.Users = _context.Users.FirstOrDefault(e => e.ID == sub.UserWriterID);
            }

            if (subscriptions is null)
            {
                return NotFound();
            }

            return new ObjectResult(subscriptions);
        }


        [HttpGet("{id}")]
        [Route("getAllWriter/{id}")]
        public async Task<ActionResult<Subscriptions>> GetAllWriter(Guid id)
        {
            List<Subscriptions> subscriptions = _context.Subscriptionses.Where(x => x.UserWriterID == id).ToList();

            foreach (var sub in subscriptions)
            {
                sub.Users = _context.Users.FirstOrDefault(e => e.ID == sub.UserSubscriptionID);
            }

            if (subscriptions is null)
            {
                return NotFound();
            }

            return new ObjectResult(subscriptions);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<Subscriptions>> Delete(Guid id)
        {
            Subscriptions sub = _context.Subscriptionses.FirstOrDefault(x =>x.ID == id);

            if (sub is null)
            {
                return NotFound();
            }

            _context.Subscriptionses.Remove(sub);
            await _context.SaveChangesAsync();

            return Ok();
        }
    }
}
