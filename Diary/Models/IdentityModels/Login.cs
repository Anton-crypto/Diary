using System.ComponentModel.DataAnnotations;

namespace Diary.Models.IdentityModels
{
    public class Login
    {
        [Required]
        [EmailAddress]
        public string Email { get; set; }
        [Required]
        public string Password { get; set; }
    }
}
