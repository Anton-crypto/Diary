using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Security.Cryptography;
using System.Text;

namespace Diary.Models.IdentityModels
{
    public class IdentityContextDb : DbContext
    {
        public IdentityContextDb(DbContextOptions<IdentityContextDb> options) : base(options) { }
        public DbSet<Person> Persons { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Person>().ToTable("Person");
            //modelBuilder.Entity<Person>().HasData(new Person
            //{
            //    Id = Guid.NewGuid(),
            //    Email = "toni_naumov_1990@mail.ru",
            //    Password = GetHash("123wera567"),
            //    Role = "admin"
            //});
        }
        private string GetHash(string input)
        {
            var md5 = MD5.Create();
            var hash = md5.ComputeHash(Encoding.UTF8.GetBytes(input));

            return Convert.ToBase64String(hash);
        }
    }
}
