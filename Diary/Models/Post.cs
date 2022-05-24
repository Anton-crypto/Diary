using Diary.Models.SubPost;

namespace Diary.Models
{
    public class Post
    {
        public Guid ID { get; set; }
        public DateTime TimePost { get; set; }
        public string Title { get; set; }
        public string? Tegs { get; set; }
        public string? Status { get; set; }

        public Guid UserID { get; set; }
        public virtual User User { get; set; }

        public bool? ValidationStatus { get; set; }

        public ICollection<Comment>? Comments { get; set; }
        public virtual ICollection<PostImage>? PostImages { get; set; }
        public virtual ICollection<PostVidio>? PostVidios { get; set; }
        public virtual ICollection<PostText>? PostTexts { get; set; }
        public virtual ICollection<Like>? Likes { get; set; }
        public virtual ICollection<Saved>? Saveds { get; set; }
    }
}
