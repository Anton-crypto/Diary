namespace Diary.Models
{
    public class PostCheckLogs
    {
        public Guid ID { get; set; }

        public Guid? UserID { get; set; }
        public Guid? PostID { get; set; }

        public virtual User? User { get; set; }
        public virtual Post? Post { get; set; }

        public DateTime Time { get; set; }
        public string Text { get; set; }
    }
}
