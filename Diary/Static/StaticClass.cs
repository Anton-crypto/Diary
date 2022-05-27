using System.Net.Mail;
using System.Net;
using Diary.Models;

namespace Diary.Static
{
    public class StaticClass
    {
        public static void SendingMessagesToEmail(string message, string email)
        {
            try
            {
                MailAddress from = new MailAddress("toni_naumov_1990@mail.ru", "Diary");
                MailAddress to = new MailAddress(email);
                MailMessage m = new MailMessage(from, to);

                m.Subject = "Оповещение";
                m.Body = message;
                m.IsBodyHtml = true;

                SmtpClient smtp = new SmtpClient("smtp.mail.ru", 587);

                smtp.Credentials = new NetworkCredential("toni_naumov_1990", "VkRAHpu6nccPXzfXgahr");
                smtp.EnableSsl = true;
                smtp.Send(m);

            } catch {}
        }
    }
}
