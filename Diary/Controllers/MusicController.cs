using Microsoft.AspNetCore.Mvc;
using Diary.Models;
using Microsoft.EntityFrameworkCore;
using Diary.General;

namespace Diary.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MusicController : ControllerBase
    {
        private readonly DiaryContextDb _context;

        public MusicController(DiaryContextDb context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Music>>> GetAllAsync()
        {
            var music = await _context.Musics.ToListAsync();
            return music == null ? NotFound() : new ObjectResult(music);
        }
    }
}
