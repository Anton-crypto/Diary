using System.Net.Mail;
using System.Net;
using Diary.Models;

namespace Diary.General
{
    public class MessageMail : IMessage
    {
        public void Send(User user, string message)
        {
            try
            {
                MailAddress from = new MailAddress("toni_naumov_1990@mail.ru", "Diary");
                MailAddress to = new MailAddress(user.Email);
                MailMessage m = new MailMessage(from, to);

                m.Subject = "Оповещение";
                m.Body = message;
                m.IsBodyHtml = true;

                SmtpClient smtp = new SmtpClient("smtp.mail.ru", 587);

                smtp.Credentials = new NetworkCredential("toni_naumov_1990", "VkRAHpu6nccPXzfXgahr");
                smtp.EnableSsl = true;
                smtp.Send(m);

            }
            catch { }
        }
    }
}
