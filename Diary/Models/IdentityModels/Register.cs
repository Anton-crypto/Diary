using System.ComponentModel.DataAnnotations;

namespace Diary.Models.IdentityModels
{
    public class Register
    {
        [Required]
        [EmailAddress]
        public string Email { get; set; }
        [Required]
        public string Password { get; set; }
        public string NikeName { get; set; }
    }
}
