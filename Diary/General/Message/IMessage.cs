using Diary.Models;

namespace Diary.General
{
    public interface IMessage
    {
        public void Send(User user, string message) { }
    }
}
