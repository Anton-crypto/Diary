﻿// <auto-generated />
using System;
using Diary.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace Diary.Migrations
{
    [DbContext(typeof(DiaryContextDb))]
    partial class DiaryContextDbModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "6.0.4")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder, 1L, 1);

            modelBuilder.Entity("Diary.Models.Comment", b =>
                {
                    b.Property<Guid>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<Guid?>("PostID")
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("Text")
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime>("TimePost")
                        .HasColumnType("datetime2");

                    b.Property<Guid?>("UserID")
                        .HasColumnType("uniqueidentifier");

                    b.HasKey("ID");

                    b.HasIndex("PostID");

                    b.HasIndex("UserID");

                    b.ToTable("Comment", (string)null);
                });

            modelBuilder.Entity("Diary.Models.Like", b =>
                {
                    b.Property<Guid>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<Guid?>("PostID")
                        .HasColumnType("uniqueidentifier");

                    b.Property<DateTime>("TimeLike")
                        .HasColumnType("datetime2");

                    b.Property<Guid?>("UserID")
                        .HasColumnType("uniqueidentifier");

                    b.HasKey("ID");

                    b.HasIndex("PostID");

                    b.HasIndex("UserID");

                    b.ToTable("Likes");
                });

            modelBuilder.Entity("Diary.Models.Message", b =>
                {
                    b.Property<Guid>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<bool>("IsSeen")
                        .HasColumnType("bit");

                    b.Property<bool>("IsStatus")
                        .HasColumnType("bit");

                    b.Property<string>("Text")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime>("TimeMessage")
                        .HasColumnType("datetime2");

                    b.Property<Guid>("UserID")
                        .HasColumnType("uniqueidentifier");

                    b.HasKey("ID");

                    b.HasIndex("UserID");

                    b.ToTable("Message", (string)null);
                });

            modelBuilder.Entity("Diary.Models.Post", b =>
                {
                    b.Property<Guid>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<bool?>("NSFW")
                        .HasColumnType("bit");

                    b.Property<string>("Status")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Tegs")
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime>("TimePost")
                        .HasColumnType("datetime2");

                    b.Property<string>("Title")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<Guid>("UserID")
                        .HasColumnType("uniqueidentifier");

                    b.Property<bool?>("ValidationStatus")
                        .HasColumnType("bit");

                    b.HasKey("ID");

                    b.HasIndex("UserID");

                    b.ToTable("Post", (string)null);
                });

            modelBuilder.Entity("Diary.Models.PostCheckLogs", b =>
                {
                    b.Property<Guid>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<Guid?>("PostID")
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("Text")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime>("Time")
                        .HasColumnType("datetime2");

                    b.Property<Guid?>("UserID")
                        .HasColumnType("uniqueidentifier");

                    b.HasKey("ID");

                    b.HasIndex("PostID");

                    b.HasIndex("UserID");

                    b.ToTable("PostCheckLogs");
                });

            modelBuilder.Entity("Diary.Models.Saved", b =>
                {
                    b.Property<Guid>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<Guid?>("PostID")
                        .HasColumnType("uniqueidentifier");

                    b.Property<DateTime>("TimeLike")
                        .HasColumnType("datetime2");

                    b.Property<Guid?>("UserID")
                        .HasColumnType("uniqueidentifier");

                    b.HasKey("ID");

                    b.HasIndex("PostID");

                    b.HasIndex("UserID");

                    b.ToTable("Saveds");
                });

            modelBuilder.Entity("Diary.Models.SubPost.PostImage", b =>
                {
                    b.Property<Guid>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("DisplayNumber")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("ImgUrl")
                        .HasColumnType("nvarchar(max)");

                    b.Property<Guid>("PostID")
                        .HasColumnType("uniqueidentifier");

                    b.HasKey("ID");

                    b.HasIndex("PostID");

                    b.ToTable("PostImage", (string)null);
                });

            modelBuilder.Entity("Diary.Models.SubPost.PostText", b =>
                {
                    b.Property<Guid>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("DisplayNumber")
                        .HasColumnType("nvarchar(max)");

                    b.Property<Guid>("PostID")
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("Text")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("ID");

                    b.HasIndex("PostID");

                    b.ToTable("PostText", (string)null);
                });

            modelBuilder.Entity("Diary.Models.SubPost.PostVidio", b =>
                {
                    b.Property<Guid>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("DisplayNumber")
                        .HasColumnType("nvarchar(max)");

                    b.Property<Guid>("PostID")
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("VidioUrl")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("ID");

                    b.HasIndex("PostID");

                    b.ToTable("PostVidio", (string)null);
                });

            modelBuilder.Entity("Diary.Models.Subscriptions", b =>
                {
                    b.Property<Guid>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<bool?>("IsAlert")
                        .HasColumnType("bit");

                    b.Property<Guid?>("UserSubscriptionID")
                        .HasColumnType("uniqueidentifier");

                    b.Property<Guid?>("UserWriterID")
                        .HasColumnType("uniqueidentifier");

                    b.Property<Guid?>("UsersID")
                        .HasColumnType("uniqueidentifier");

                    b.HasKey("ID");

                    b.HasIndex("UsersID");

                    b.ToTable("Subscriptions", (string)null);
                });

            modelBuilder.Entity("Diary.Models.User", b =>
                {
                    b.Property<Guid>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("About")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Email")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Font")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Gender")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Icon")
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool?>("IsBan")
                        .HasColumnType("bit");

                    b.Property<bool?>("IsBlok")
                        .HasColumnType("bit");

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime?>("TimeBan")
                        .HasColumnType("datetime2");

                    b.HasKey("ID");

                    b.ToTable("User", (string)null);
                });

            modelBuilder.Entity("Diary.Models.Comment", b =>
                {
                    b.HasOne("Diary.Models.Post", "Post")
                        .WithMany("Comments")
                        .HasForeignKey("PostID");

                    b.HasOne("Diary.Models.User", "User")
                        .WithMany("Comments")
                        .HasForeignKey("UserID");

                    b.Navigation("Post");

                    b.Navigation("User");
                });

            modelBuilder.Entity("Diary.Models.Like", b =>
                {
                    b.HasOne("Diary.Models.Post", "Post")
                        .WithMany("Likes")
                        .HasForeignKey("PostID");

                    b.HasOne("Diary.Models.User", "User")
                        .WithMany("Likes")
                        .HasForeignKey("UserID");

                    b.Navigation("Post");

                    b.Navigation("User");
                });

            modelBuilder.Entity("Diary.Models.Message", b =>
                {
                    b.HasOne("Diary.Models.User", "User")
                        .WithMany("Messages")
                        .HasForeignKey("UserID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("User");
                });

            modelBuilder.Entity("Diary.Models.Post", b =>
                {
                    b.HasOne("Diary.Models.User", "User")
                        .WithMany("Posts")
                        .HasForeignKey("UserID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("User");
                });

            modelBuilder.Entity("Diary.Models.PostCheckLogs", b =>
                {
                    b.HasOne("Diary.Models.Post", "Post")
                        .WithMany()
                        .HasForeignKey("PostID");

                    b.HasOne("Diary.Models.User", "User")
                        .WithMany("PostCheckLogss")
                        .HasForeignKey("UserID");

                    b.Navigation("Post");

                    b.Navigation("User");
                });

            modelBuilder.Entity("Diary.Models.Saved", b =>
                {
                    b.HasOne("Diary.Models.Post", "Post")
                        .WithMany("Saveds")
                        .HasForeignKey("PostID");

                    b.HasOne("Diary.Models.User", "User")
                        .WithMany("Saveds")
                        .HasForeignKey("UserID");

                    b.Navigation("Post");

                    b.Navigation("User");
                });

            modelBuilder.Entity("Diary.Models.SubPost.PostImage", b =>
                {
                    b.HasOne("Diary.Models.Post", "Post")
                        .WithMany("PostImages")
                        .HasForeignKey("PostID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Post");
                });

            modelBuilder.Entity("Diary.Models.SubPost.PostText", b =>
                {
                    b.HasOne("Diary.Models.Post", "Post")
                        .WithMany("PostTexts")
                        .HasForeignKey("PostID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Post");
                });

            modelBuilder.Entity("Diary.Models.SubPost.PostVidio", b =>
                {
                    b.HasOne("Diary.Models.Post", "Post")
                        .WithMany("PostVidios")
                        .HasForeignKey("PostID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Post");
                });

            modelBuilder.Entity("Diary.Models.Subscriptions", b =>
                {
                    b.HasOne("Diary.Models.User", "Users")
                        .WithMany("Subscribers")
                        .HasForeignKey("UsersID");

                    b.Navigation("Users");
                });

            modelBuilder.Entity("Diary.Models.Post", b =>
                {
                    b.Navigation("Comments");

                    b.Navigation("Likes");

                    b.Navigation("PostImages");

                    b.Navigation("PostTexts");

                    b.Navigation("PostVidios");

                    b.Navigation("Saveds");
                });

            modelBuilder.Entity("Diary.Models.User", b =>
                {
                    b.Navigation("Comments");

                    b.Navigation("Likes");

                    b.Navigation("Messages");

                    b.Navigation("PostCheckLogss");

                    b.Navigation("Posts");

                    b.Navigation("Saveds");

                    b.Navigation("Subscribers");
                });
#pragma warning restore 612, 618
        }
    }
}
