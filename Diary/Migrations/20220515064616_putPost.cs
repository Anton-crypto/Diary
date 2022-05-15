using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Diary.Migrations
{
    public partial class putPost : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Post_PostImage_PostImageID",
                table: "Post");

            migrationBuilder.DropForeignKey(
                name: "FK_Post_PostText_PostTextID",
                table: "Post");

            migrationBuilder.DropForeignKey(
                name: "FK_Post_PostVidio_PostVidioID",
                table: "Post");

            migrationBuilder.DropIndex(
                name: "IX_Post_PostImageID",
                table: "Post");

            migrationBuilder.DropIndex(
                name: "IX_Post_PostTextID",
                table: "Post");

            migrationBuilder.DropIndex(
                name: "IX_Post_PostVidioID",
                table: "Post");

            migrationBuilder.DropColumn(
                name: "ImageID",
                table: "Post");

            migrationBuilder.DropColumn(
                name: "PostImageID",
                table: "Post");

            migrationBuilder.DropColumn(
                name: "PostTextID",
                table: "Post");

            migrationBuilder.DropColumn(
                name: "PostVidioID",
                table: "Post");

            migrationBuilder.DropColumn(
                name: "TextID",
                table: "Post");

            migrationBuilder.DropColumn(
                name: "VidioID",
                table: "Post");

            migrationBuilder.AlterColumn<string>(
                name: "VidioUrl",
                table: "PostVidio",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AddColumn<Guid>(
                name: "PostID",
                table: "PostVidio",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AlterColumn<string>(
                name: "Text",
                table: "PostText",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AddColumn<Guid>(
                name: "PostID",
                table: "PostText",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AlterColumn<string>(
                name: "ImgUrl",
                table: "PostImage",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AddColumn<Guid>(
                name: "PostID",
                table: "PostImage",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.CreateIndex(
                name: "IX_PostVidio_PostID",
                table: "PostVidio",
                column: "PostID");

            migrationBuilder.CreateIndex(
                name: "IX_PostText_PostID",
                table: "PostText",
                column: "PostID");

            migrationBuilder.CreateIndex(
                name: "IX_PostImage_PostID",
                table: "PostImage",
                column: "PostID");

            migrationBuilder.AddForeignKey(
                name: "FK_PostImage_Post_PostID",
                table: "PostImage",
                column: "PostID",
                principalTable: "Post",
                principalColumn: "ID",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_PostText_Post_PostID",
                table: "PostText",
                column: "PostID",
                principalTable: "Post",
                principalColumn: "ID",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_PostVidio_Post_PostID",
                table: "PostVidio",
                column: "PostID",
                principalTable: "Post",
                principalColumn: "ID",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_PostImage_Post_PostID",
                table: "PostImage");

            migrationBuilder.DropForeignKey(
                name: "FK_PostText_Post_PostID",
                table: "PostText");

            migrationBuilder.DropForeignKey(
                name: "FK_PostVidio_Post_PostID",
                table: "PostVidio");

            migrationBuilder.DropIndex(
                name: "IX_PostVidio_PostID",
                table: "PostVidio");

            migrationBuilder.DropIndex(
                name: "IX_PostText_PostID",
                table: "PostText");

            migrationBuilder.DropIndex(
                name: "IX_PostImage_PostID",
                table: "PostImage");

            migrationBuilder.DropColumn(
                name: "PostID",
                table: "PostVidio");

            migrationBuilder.DropColumn(
                name: "PostID",
                table: "PostText");

            migrationBuilder.DropColumn(
                name: "PostID",
                table: "PostImage");

            migrationBuilder.AlterColumn<string>(
                name: "VidioUrl",
                table: "PostVidio",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "Text",
                table: "PostText",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "ImgUrl",
                table: "PostImage",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.AddColumn<Guid>(
                name: "ImageID",
                table: "Post",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AddColumn<Guid>(
                name: "PostImageID",
                table: "Post",
                type: "uniqueidentifier",
                nullable: true);

            migrationBuilder.AddColumn<Guid>(
                name: "PostTextID",
                table: "Post",
                type: "uniqueidentifier",
                nullable: true);

            migrationBuilder.AddColumn<Guid>(
                name: "PostVidioID",
                table: "Post",
                type: "uniqueidentifier",
                nullable: true);

            migrationBuilder.AddColumn<Guid>(
                name: "TextID",
                table: "Post",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AddColumn<Guid>(
                name: "VidioID",
                table: "Post",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.CreateIndex(
                name: "IX_Post_PostImageID",
                table: "Post",
                column: "PostImageID");

            migrationBuilder.CreateIndex(
                name: "IX_Post_PostTextID",
                table: "Post",
                column: "PostTextID");

            migrationBuilder.CreateIndex(
                name: "IX_Post_PostVidioID",
                table: "Post",
                column: "PostVidioID");

            migrationBuilder.AddForeignKey(
                name: "FK_Post_PostImage_PostImageID",
                table: "Post",
                column: "PostImageID",
                principalTable: "PostImage",
                principalColumn: "ID");

            migrationBuilder.AddForeignKey(
                name: "FK_Post_PostText_PostTextID",
                table: "Post",
                column: "PostTextID",
                principalTable: "PostText",
                principalColumn: "ID");

            migrationBuilder.AddForeignKey(
                name: "FK_Post_PostVidio_PostVidioID",
                table: "Post",
                column: "PostVidioID",
                principalTable: "PostVidio",
                principalColumn: "ID");
        }
    }
}
