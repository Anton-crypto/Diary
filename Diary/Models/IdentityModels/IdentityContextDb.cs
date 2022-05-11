using Microsoft.EntityFrameworkCore;

namespace Diary.Models.IdentityModels
{
    public class IdentityContextDb : DbContext
    {
        public IdentityContextDb(DbContextOptions<IdentityContextDb> options) : base(options) { }
        public DbSet<Person> Persons { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Person>().ToTable("Person");
        }
    }
}
