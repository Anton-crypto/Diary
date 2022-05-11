namespace Diary.Models
{
    public class Post
    {
        
        public Guid ID { get; set; }
        public DateTime TimePost { get; set; }
        public string Title { get; set; }
        public string? BodyText { get; set; }
        public string? BodyUrlImg { get; set; }

        public Guid UserID { get; set; }
        public User User { get; set; }
    }
}
