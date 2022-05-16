﻿using Diary.Models.SubPost;
using Microsoft.EntityFrameworkCore;

namespace Diary.Models
{
    public class DiaryContextDb : DbContext
    {
        public DiaryContextDb(DbContextOptions<DiaryContextDb> options) : base(options) {}

        public DbSet<User> Users { get; set; }
        public DbSet<Comment> Comments { get; set; }
        public DbSet<Subscriptions> Subscriptionses { get; set; }

        public DbSet<Post> Posts { get; set; }
        public DbSet<PostVidio> PostVidios { get; set; }
        public DbSet<PostImage> PostImages { get; set; }
        public DbSet<PostText> PostTexts { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Post>().ToTable("Post");
            modelBuilder.Entity<User>().ToTable("User");
            modelBuilder.Entity<Comment>().ToTable("Comment");
            //modelBuilder
            //    .Entity<Comment>()
            //    .HasOne(e => e.User)
            //    .WithMany(e => e.Comments)
            //    .OnDelete(DeleteBehavior.SetNull);
            //modelBuilder
            //    .Entity<Comment>()
            //    .HasOne(e => e.Post)
            //    .WithMany(e => e.Comments)
            //    .OnDelete(DeleteBehavior.Cascade);
            modelBuilder.Entity<Subscriptions>().ToTable("Subscriptions");
            modelBuilder.Entity<PostVidio>().ToTable("PostVidio");
            modelBuilder.Entity<PostImage>().ToTable("PostImage");
            modelBuilder.Entity<PostText>().ToTable("PostText");

        }
    }
}
