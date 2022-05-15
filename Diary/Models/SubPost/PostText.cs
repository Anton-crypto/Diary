namespace Diary.Models.SubPost
{
    public class PostText
    {
        public Guid ID { get; set; }
        public string? Text { get; set; }
        public string? DisplayNumber { get; set; }
        public Guid PostID { get; set; }
        public virtual Post? Post { get; set; }
    }
}
