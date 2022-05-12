namespace Diary.Models.IdentityModels
{
    public class AuthenticatedResponse
    {
        public string? Token { get; set; }
        public string? RefreshToken { get; set; }
        public Person? User { get; set; }
    }
}
