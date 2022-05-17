using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Diary.Migrations
{
    public partial class updatenewtable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Like_Post_PostID",
                table: "Like");

            migrationBuilder.DropForeignKey(
                name: "FK_Like_User_UserID",
                table: "Like");

            migrationBuilder.DropForeignKey(
                name: "FK_Saved_Post_PostID",
                table: "Saved");

            migrationBuilder.DropForeignKey(
                name: "FK_Saved_User_UserID",
                table: "Saved");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Saved",
                table: "Saved");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Like",
                table: "Like");

            migrationBuilder.RenameTable(
                name: "Saved",
                newName: "Saveds");

            migrationBuilder.RenameTable(
                name: "Like",
                newName: "Likes");

            migrationBuilder.RenameIndex(
                name: "IX_Saved_UserID",
                table: "Saveds",
                newName: "IX_Saveds_UserID");

            migrationBuilder.RenameIndex(
                name: "IX_Saved_PostID",
                table: "Saveds",
                newName: "IX_Saveds_PostID");

            migrationBuilder.RenameIndex(
                name: "IX_Like_UserID",
                table: "Likes",
                newName: "IX_Likes_UserID");

            migrationBuilder.RenameIndex(
                name: "IX_Like_PostID",
                table: "Likes",
                newName: "IX_Likes_PostID");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Saveds",
                table: "Saveds",
                column: "ID");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Likes",
                table: "Likes",
                column: "ID");

            migrationBuilder.AddForeignKey(
                name: "FK_Likes_Post_PostID",
                table: "Likes",
                column: "PostID",
                principalTable: "Post",
                principalColumn: "ID");

            migrationBuilder.AddForeignKey(
                name: "FK_Likes_User_UserID",
                table: "Likes",
                column: "UserID",
                principalTable: "User",
                principalColumn: "ID");

            migrationBuilder.AddForeignKey(
                name: "FK_Saveds_Post_PostID",
                table: "Saveds",
                column: "PostID",
                principalTable: "Post",
                principalColumn: "ID");

            migrationBuilder.AddForeignKey(
                name: "FK_Saveds_User_UserID",
                table: "Saveds",
                column: "UserID",
                principalTable: "User",
                principalColumn: "ID");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Likes_Post_PostID",
                table: "Likes");

            migrationBuilder.DropForeignKey(
                name: "FK_Likes_User_UserID",
                table: "Likes");

            migrationBuilder.DropForeignKey(
                name: "FK_Saveds_Post_PostID",
                table: "Saveds");

            migrationBuilder.DropForeignKey(
                name: "FK_Saveds_User_UserID",
                table: "Saveds");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Saveds",
                table: "Saveds");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Likes",
                table: "Likes");

            migrationBuilder.RenameTable(
                name: "Saveds",
                newName: "Saved");

            migrationBuilder.RenameTable(
                name: "Likes",
                newName: "Like");

            migrationBuilder.RenameIndex(
                name: "IX_Saveds_UserID",
                table: "Saved",
                newName: "IX_Saved_UserID");

            migrationBuilder.RenameIndex(
                name: "IX_Saveds_PostID",
                table: "Saved",
                newName: "IX_Saved_PostID");

            migrationBuilder.RenameIndex(
                name: "IX_Likes_UserID",
                table: "Like",
                newName: "IX_Like_UserID");

            migrationBuilder.RenameIndex(
                name: "IX_Likes_PostID",
                table: "Like",
                newName: "IX_Like_PostID");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Saved",
                table: "Saved",
                column: "ID");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Like",
                table: "Like",
                column: "ID");

            migrationBuilder.AddForeignKey(
                name: "FK_Like_Post_PostID",
                table: "Like",
                column: "PostID",
                principalTable: "Post",
                principalColumn: "ID");

            migrationBuilder.AddForeignKey(
                name: "FK_Like_User_UserID",
                table: "Like",
                column: "UserID",
                principalTable: "User",
                principalColumn: "ID");

            migrationBuilder.AddForeignKey(
                name: "FK_Saved_Post_PostID",
                table: "Saved",
                column: "PostID",
                principalTable: "Post",
                principalColumn: "ID");

            migrationBuilder.AddForeignKey(
                name: "FK_Saved_User_UserID",
                table: "Saved",
                column: "UserID",
                principalTable: "User",
                principalColumn: "ID");
        }
    }
}
