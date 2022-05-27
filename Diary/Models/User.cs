namespace Diary.Models
{
    public class User
    {
        public User()
        {
            Subscribers = new List<Subscriptions>();
        }

        public Guid ID { get; set; }

        public string? Email { get; set; }
        public string? Name { get; set; }
        public string? Icon { get; set; }
        public string? Font { get; set; }
        public string? About { get; set; }
        public string? Gender { get; set; }

        public bool? IsBan { get; set; }
        public DateTime? TimeBan { get; set; }
        public bool? IsBlok { get; set; }


        public virtual ICollection<Post>? Posts { get; set; }
        public virtual ICollection<Subscriptions>? Subscribers { get; set; }
        public virtual ICollection<Comment>? Comments { get; set; }
        public virtual ICollection<Like>? Likes { get; set; }
        public virtual ICollection<Saved>? Saveds { get; set; }
    }
}
