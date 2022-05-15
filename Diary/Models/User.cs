namespace Diary.Models
{
    public class User
    {
        public Guid ID { get; set; }

        public string? Email { get; set; }
        public string? Name { get; set; }
        public string? Icon { get; set; }
        public string? Font { get; set; }
        public string? About { get; set; }
        public string? Gender { get; set; }

        public virtual ICollection<Post>? Posts { get; set; }
        public virtual ICollection<Subscriptions>? Subscribers { get; set; }
    }
}
