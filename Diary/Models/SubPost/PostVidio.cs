namespace Diary.Models.SubPost
{
    public class PostVidio
    {
        public Guid ID { get; set; }
        public string? VidioUrl { get; set; }
        public string? DisplayNumber { get; set; }
        public Guid PostID { get; set; }
        public virtual Post? Post { get; set; }
    }
}
