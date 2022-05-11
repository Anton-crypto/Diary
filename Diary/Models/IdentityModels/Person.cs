using System.ComponentModel.DataAnnotations;

namespace Diary.Models.IdentityModels
{
    public class Person
    {
        public Guid Id { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string Role { get; set; }
    }
}
