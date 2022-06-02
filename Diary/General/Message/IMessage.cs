using Diary.Models;
using Diary.Models.IdentityModels;

namespace Diary.General
{
    public interface IMessage
    {
        public void Send(User user, string message) { }
        public void Send(Person user, string message) { }
    }
}
