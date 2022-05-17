namespace Diary.Models
{
    public class Subscriptions
    {
        public Guid ID { get; set; }
        public User Users { get; set; }
        public Guid? UserSubscriptionID { get; set; }
        public Guid? UserWriterID { get; set; }
    }
}
