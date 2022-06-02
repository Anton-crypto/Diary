using System.Net.Mail;
using System.Net;
using Diary.Models;
using Diary.Models.IdentityModels;
using System.Collections.Specialized;
using System.Text;

namespace Diary.General
{
    public class MessageMail : IMessage
    {
        private string TemplatesMailFromResetPassword { get; set; } = System.IO.File.ReadAllText(@".\General\Message\TemplatesMail\index.html");
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
        public void Send(Person user, string password)
        {
            try
            {
                string body = InterpolationForVariables(TemplatesMailFromResetPassword.ToString(), new string[] { password }, new string[]{ "${password}" });

                MailAddress from = new MailAddress("toni_naumov_1990@mail.ru", "Diary");
                MailAddress to = new MailAddress(user.Email);
                MailMessage m = new MailMessage(from, to);

                m.Subject = "Оповещение";
                m.Body = body;
                m.IsBodyHtml = true;

                SmtpClient smtp = new SmtpClient("smtp.mail.ru", 587);

                smtp.Credentials = new NetworkCredential("toni_naumov_1990", "VkRAHpu6nccPXzfXgahr");
                smtp.EnableSsl = true;
                smtp.Send(m);

            }
            catch { }
        }
        private string InterpolationForVariables(string template, string[] argValue, string [] arg)
        {
            for (int i = 0; i < arg.Length; i++)
            {
                template = template.Replace(arg[i], argValue[i]);
            }

            return template;
        }
    }
}
