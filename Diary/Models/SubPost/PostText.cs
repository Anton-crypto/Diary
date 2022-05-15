namespace Diary.Models.SubPost
{
    public class PostText
    {
        public Guid ID { get; set; }
        public string Text { get; set; }
        public virtual ICollection<Post>? Post { get; set; }
    }
}
