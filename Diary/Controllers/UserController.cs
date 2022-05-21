using Microsoft.AspNetCore.Mvc;
using Diary.Models;
using Microsoft.EntityFrameworkCore;
using System.Net.Http.Headers;  

namespace Diary.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {

        private readonly DiaryContextDb _context;

        public UserController(DiaryContextDb context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<User>>> Get()
        {
            return new ObjectResult(await _context.Users.ToListAsync());
        }

        [HttpGet("{id}")]
        [Route("id/{id}")]
        public async Task<ActionResult<User>> Get(Guid id)
        {
            User user = await _context.Users.FirstOrDefaultAsync(x => x.ID == id);
            return user == null ? NotFound() : new ObjectResult(user);
        }
        [HttpGet("{email}")]
        [Route("email/{email}")]
        public async Task<ActionResult<User>> GetUserOnEmail(string email)
        {
            User user = await _context.Users.FirstOrDefaultAsync(x => x.Email == email);
            return user == null ? NotFound() : new ObjectResult(user);
        }

        [HttpPut, DisableRequestSizeLimit]
        public async Task<ActionResult<User>> Put()
        {
            try
            {
                var formCollection = await Request.ReadFormAsync();

                var fileList = formCollection.Files.ToList();
                var userItemList = formCollection.Keys.ToList();

                string name = "";
                string about = "";
                string gender = "";

                User user = null; 

                foreach (var item in userItemList)
                {
                    switch (item)
                    {
                        case "id": { user = await _context.Users.FirstOrDefaultAsync(x => x.ID == Guid.Parse(formCollection[item])); break; }
                        case "name": { name = formCollection[item]; break; }
                        case "about": { about = formCollection[item]; break; }
                        case "gender": { gender = formCollection[item]; break; }
                        default: break;
                    }
                }

                if (user == null)
                {
                    return StatusCode(500, $"Internal server error");
                }

                var folderName = Path.Combine("Resources", "Images");
                var pathToSave = Path.Combine(Directory.GetCurrentDirectory(), folderName);

                foreach (var item in fileList)
                {
                    if(item.Length <= 0)
                    {
                        break;
                    }

                    var fileName = Guid.NewGuid().ToString() + "." +
                        item.ContentType.Trim('"').Split('/')[1];

                    var fullPath = Path.Combine(pathToSave, fileName);
                    var dbPath = Path.Combine(folderName, fileName);

                    using (var stream = new FileStream(fullPath, FileMode.Create))
                    {
                        item.CopyTo(stream);
                    }

                    FileInfo file = null;

                    if (item.Name == "icon")
                    {
                        user.Icon = dbPath;

                        if (user.Icon == null) break;
                        file = new FileInfo(Path.Combine(folderName, user.Icon));

                    } else if (item.Name == "font")
                    {
                        user.Font = dbPath;

                        if (user.Font == null) break;
                        file = new FileInfo(Path.Combine(folderName, user.Font));
                    }

                    if (file != null && file.Exists) file.Delete();

                }

                user.About = about;
                user.Gender = gender;
                user.Name = name;

                await _context.SaveChangesAsync();
                return Ok(user);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex}");
            }
        }
    }
}
