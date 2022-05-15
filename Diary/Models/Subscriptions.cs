namespace Diary.Models
{
    public class Subscriptions
    {
        public Guid ID { get; set; }
        
        public Guid UserID { get; set; }
        public User? User { get; set; }

    }
}
