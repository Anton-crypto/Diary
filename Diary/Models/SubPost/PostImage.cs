namespace Diary.Models.SubPost
{
    public class PostImage
    {
        public Guid ID { get; set; }
        public string ImgUrl { get; set; }
        public virtual ICollection<Post>? Post { get; set; }
    }
}
