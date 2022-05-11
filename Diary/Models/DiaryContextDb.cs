using Microsoft.EntityFrameworkCore;

namespace Diary.Models
{
    public class DiaryContextDb : DbContext
    {
        public DiaryContextDb(DbContextOptions<DiaryContextDb> options) : base(options) {}

        public DbSet<Post> Posts { get; set; }
        public DbSet<User> Users { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Post>().ToTable("Post");
            modelBuilder.Entity<User>().ToTable("User");
        }
    }
}
