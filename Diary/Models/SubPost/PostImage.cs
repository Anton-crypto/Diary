namespace Diary.Models.SubPost
{
    public class PostImage
    {
        public Guid ID { get; set; }
        public string? ImgUrl { get; set; }
        public string? DisplayNumber { get; set; }
        public Guid PostID { get; set; }
        public virtual Post? Post { get; set; }
    }
}
