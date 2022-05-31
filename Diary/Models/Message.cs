namespace Diary.Models
{
    public class Message
    {
        public Guid ID { get; set; }
        public DateTime TimeMessage { get; set; }
        public string Text{ get; set; }
        public bool IsStatus { get; set; }
        public bool IsSeen { get; set; }

        public Guid UserID { get; set; }
        public virtual User User { get; set; }

    }
}
