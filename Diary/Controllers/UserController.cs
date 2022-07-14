using Microsoft.AspNetCore.Mvc;
using Diary.Models;
using Microsoft.EntityFrameworkCore;
using System.Net.Http.Headers;
using Diary.Models.IdentityModels;

namespace Diary.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {

        private readonly DiaryContextDb _context;
        private readonly IdentityContextDb _contextIdentity;

        public UserController(DiaryContextDb context, IdentityContextDb contextIdentity)
        {
            _context = context;
            _contextIdentity = contextIdentity;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<User>>> Get()
        {
            List<Person> persons = await _contextIdentity.Persons.Where(e => e.Role == "user").ToListAsync();
            List<User> users = new List<User>();

            foreach (var person in persons)
            {
                users.Add(await _context.Users.FirstOrDefaultAsync(x => x.Email == person.Email));
            }

            return users == null ? NotFound() : new ObjectResult(users);
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
        [HttpGet]
        [Route("moder")]
        public async Task<ActionResult<User>> GetModerAsync()
        {
            List<Person> persons = await _contextIdentity.Persons.Where(e => e.Role == "moder").ToListAsync();
            List<User> users = new List<User>();

            foreach (var person in persons)
            {
                users.Add(await _context.Users.FirstOrDefaultAsync(x => x.Email == person.Email));
            }

            return users == null ? NotFound() : new ObjectResult(users);
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

                var folderName = System.IO.Path.Combine("Resources", "Images");
                var pathToSave = System.IO.Path.Combine(Directory.GetCurrentDirectory(), folderName);

                foreach (var item in fileList)
                {
                    if(item.Length <= 0)
                    {
                        break;
                    }

                    var fileName = Guid.NewGuid().ToString() + "." +
                        item.ContentType.Trim('"').Split('/')[1];

                    var fullPath = System.IO.Path.Combine(pathToSave, fileName);
                    var dbPath = System.IO.Path.Combine(folderName, fileName);

                    using (var stream = new FileStream(fullPath, FileMode.Create))
                    {
                        item.CopyTo(stream);
                    }

                    FileInfo file = null;

                    if (item.Name == "icon")
                    {
                        user.Icon = dbPath;

                        if (user.Icon == null) break;
                        file = new FileInfo(System.IO.Path.Combine(folderName, user.Icon));

                    } else if (item.Name == "font")
                    {
                        user.Font = dbPath;

                        if (user.Font == null) break;
                        file = new FileInfo(System.IO.Path.Combine(folderName, user.Font));
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
