namespace Diary.Models
{
    public class Like
    {
        public Guid ID { get; set; }
        public DateTime TimeLike { get; set; }

        public Guid? UserID { get; set; }
        public Guid? PostID { get; set; }

        public virtual Post? Post { get; set; }
        public virtual User? User { get; set; }
    }
}
