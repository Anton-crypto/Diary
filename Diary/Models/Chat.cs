namespace Diary.Models
{
    public class Chat
    {
        public Guid? Id { get; set; }
        public Guid? UserFromId { get; set; }
        public Guid? UserToId { get; set; }
        public string? Text { get; set; }
    }
}
