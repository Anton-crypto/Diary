namespace Diary.Models
{
    public class Comment
    {
        public Guid ID { get; set; }
        public string? Text { get; set; }
        public DateTime TimePost { get; set; }
        public Guid? UserID { get; set; }
        public Guid? PostID { get; set; }

        public virtual Post? Post { get; set; }
        public virtual User? User { get; set; }

    }
}
