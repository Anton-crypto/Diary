namespace Diary.Models.IdentityModels
{
    public class AuthenticatedResponse
    {
        public string? Token { get; set; }
        public string? RefreshToken { get; set; }
        public User? User { get; set; }
        public string? Role { get; set; }
    }
}
