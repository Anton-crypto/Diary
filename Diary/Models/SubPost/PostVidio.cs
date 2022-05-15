namespace Diary.Models.SubPost
{
    public class PostVidio
    {
        public Guid ID { get; set; }
        public string VidioUrl { get; set; }
        public virtual ICollection<Post>? Post { get; set; }
    }
}
