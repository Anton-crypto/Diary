namespace Diary.Models
{
    public class Comment
    {
        public Guid ID { get; set; }
        public string Text { get; set; }

        public Guid PostID { get; set; }
        public virtual Post Post { get; set; }
    }
}
