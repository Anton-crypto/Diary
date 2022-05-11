namespace Diary.Models
{
    public class User
    {
        public Guid ID { get; set; }
        public string? Email { get; set; }
        public string? Name { get; set; }
        public string? Icon { get; set; }
        public ICollection<Post>? Posts { get; set; }
    }
}
