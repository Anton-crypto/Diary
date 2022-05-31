using Diary.Models;

namespace Diary.General
{
    public class MessageDiary : IMessage
    {
        private readonly DiaryContextDb _context;

        public MessageDiary(DiaryContextDb context)
        {
            _context = context;
        }

        public void Send(User user, string message)
        {
            Message mes = new Message
            {
                UserID =  user.ID,
                Text = message,
                IsSeen = false,
                IsStatus = false,
                TimeMessage = DateTime.Now
            };

            _context.Messages.Add(mes);
            _context.SaveChanges();
        }
    }
}
