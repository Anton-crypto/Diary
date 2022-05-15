﻿// <auto-generated />
using System;
using Diary.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace Diary.Migrations
{
    [DbContext(typeof(DiaryContextDb))]
    [Migration("20220515024537_tablesNew")]
    partial class tablesNew
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
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

                    b.Property<Guid>("PostID")
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("Text")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("ID");

                    b.HasIndex("PostID");

                    b.ToTable("Comment", (string)null);
                });

            modelBuilder.Entity("Diary.Models.Post", b =>
                {
                    b.Property<Guid>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<Guid>("ImageID")
                        .HasColumnType("uniqueidentifier");

                    b.Property<Guid?>("PostImageID")
                        .HasColumnType("uniqueidentifier");

                    b.Property<Guid?>("PostTextID")
                        .HasColumnType("uniqueidentifier");

                    b.Property<Guid?>("PostVidioID")
                        .HasColumnType("uniqueidentifier");

                    b.Property<Guid>("TextID")
                        .HasColumnType("uniqueidentifier");

                    b.Property<DateTime>("TimePost")
                        .HasColumnType("datetime2");

                    b.Property<string>("Title")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<Guid>("UserID")
                        .HasColumnType("uniqueidentifier");

                    b.Property<Guid>("VidioID")
                        .HasColumnType("uniqueidentifier");

                    b.HasKey("ID");

                    b.HasIndex("PostImageID");

                    b.HasIndex("PostTextID");

                    b.HasIndex("PostVidioID");

                    b.HasIndex("UserID");

                    b.ToTable("Post", (string)null);
                });

            modelBuilder.Entity("Diary.Models.SubPost.PostImage", b =>
                {
                    b.Property<Guid>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("ImgUrl")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("ID");

                    b.ToTable("PostImage", (string)null);
                });

            modelBuilder.Entity("Diary.Models.SubPost.PostText", b =>
                {
                    b.Property<Guid>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("Text")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("ID");

                    b.ToTable("PostText", (string)null);
                });

            modelBuilder.Entity("Diary.Models.SubPost.PostVidio", b =>
                {
                    b.Property<Guid>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("VidioUrl")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("ID");

                    b.ToTable("PostVidio", (string)null);
                });

            modelBuilder.Entity("Diary.Models.Subscriptions", b =>
                {
                    b.Property<Guid>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<Guid>("UserID")
                        .HasColumnType("uniqueidentifier");

                    b.HasKey("ID");

                    b.HasIndex("UserID");

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

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("ID");

                    b.ToTable("User", (string)null);
                });

            modelBuilder.Entity("Diary.Models.Comment", b =>
                {
                    b.HasOne("Diary.Models.Post", "Post")
                        .WithMany("Comments")
                        .HasForeignKey("PostID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Post");
                });

            modelBuilder.Entity("Diary.Models.Post", b =>
                {
                    b.HasOne("Diary.Models.SubPost.PostImage", "PostImage")
                        .WithMany("Post")
                        .HasForeignKey("PostImageID");

                    b.HasOne("Diary.Models.SubPost.PostText", "PostText")
                        .WithMany("Post")
                        .HasForeignKey("PostTextID");

                    b.HasOne("Diary.Models.SubPost.PostVidio", "PostVidio")
                        .WithMany("Post")
                        .HasForeignKey("PostVidioID");

                    b.HasOne("Diary.Models.User", "User")
                        .WithMany("Posts")
                        .HasForeignKey("UserID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("PostImage");

                    b.Navigation("PostText");

                    b.Navigation("PostVidio");

                    b.Navigation("User");
                });

            modelBuilder.Entity("Diary.Models.Subscriptions", b =>
                {
                    b.HasOne("Diary.Models.User", "User")
                        .WithMany("Subscribers")
                        .HasForeignKey("UserID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("User");
                });

            modelBuilder.Entity("Diary.Models.Post", b =>
                {
                    b.Navigation("Comments");
                });

            modelBuilder.Entity("Diary.Models.SubPost.PostImage", b =>
                {
                    b.Navigation("Post");
                });

            modelBuilder.Entity("Diary.Models.SubPost.PostText", b =>
                {
                    b.Navigation("Post");
                });

            modelBuilder.Entity("Diary.Models.SubPost.PostVidio", b =>
                {
                    b.Navigation("Post");
                });

            modelBuilder.Entity("Diary.Models.User", b =>
                {
                    b.Navigation("Posts");

                    b.Navigation("Subscribers");
                });
#pragma warning restore 612, 618
        }
    }
}