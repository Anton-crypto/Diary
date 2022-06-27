using Diary.Models.SubPost;
using Microsoft.EntityFrameworkCore;

namespace Diary.Models
{
    public class DiaryContextDb : DbContext
    {
        public DiaryContextDb(DbContextOptions<DiaryContextDb> options) : base(options) {}

        public DbSet<User> Users { get; set; }
        public DbSet<Comment> Comments { get; set; }
        public DbSet<Subscriptions> Subscriptionses { get; set; }
        public DbSet<Like> Likes { get; set; }
        public DbSet<Saved> Saveds { get; set; }

        public DbSet<Post> Posts { get; set; }
        public DbSet<PostVidio> PostVidios { get; set; }
        public DbSet<PostImage> PostImages { get; set; }
        public DbSet<PostText> PostTexts { get; set; }

        public DbSet<Message> Messages { get; set; }
        public DbSet<PostCheckLogs> PostCheckLogs { get; set; }
        public DbSet<Chat> Chats { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Post>().ToTable("Post");
            modelBuilder.Entity<User>().ToTable("User");
            modelBuilder.Entity<Comment>().ToTable("Comment");
            modelBuilder.Entity<Subscriptions>().ToTable("Subscriptions");
            modelBuilder.Entity<PostVidio>().ToTable("PostVidio");
            modelBuilder.Entity<PostImage>().ToTable("PostImage");
            modelBuilder.Entity<PostText>().ToTable("PostText");
            modelBuilder.Entity<Message>().ToTable("Message");
        }
    }
}
