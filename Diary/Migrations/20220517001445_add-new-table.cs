using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Diary.Migrations
{
    public partial class addnewtable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Subscriptions_User_UserID",
                table: "Subscriptions");

            migrationBuilder.RenameColumn(
                name: "UserID",
                table: "Subscriptions",
                newName: "UsersID");

            migrationBuilder.RenameIndex(
                name: "IX_Subscriptions_UserID",
                table: "Subscriptions",
                newName: "IX_Subscriptions_UsersID");

            migrationBuilder.AddColumn<Guid>(
                name: "UserSubscriptionID",
                table: "Subscriptions",
                type: "uniqueidentifier",
                nullable: true);

            migrationBuilder.AddColumn<Guid>(
                name: "UserWriterID",
                table: "Subscriptions",
                type: "uniqueidentifier",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "Like",
                columns: table => new
                {
                    ID = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    TimeLike = table.Column<DateTime>(type: "datetime2", nullable: false),
                    UserID = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    PostID = table.Column<Guid>(type: "uniqueidentifier", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Like", x => x.ID);
                    table.ForeignKey(
                        name: "FK_Like_Post_PostID",
                        column: x => x.PostID,
                        principalTable: "Post",
                        principalColumn: "ID");
                    table.ForeignKey(
                        name: "FK_Like_User_UserID",
                        column: x => x.UserID,
                        principalTable: "User",
                        principalColumn: "ID");
                });

            migrationBuilder.CreateTable(
                name: "Saved",
                columns: table => new
                {
                    ID = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    TimeLike = table.Column<DateTime>(type: "datetime2", nullable: false),
                    UserID = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    PostID = table.Column<Guid>(type: "uniqueidentifier", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Saved", x => x.ID);
                    table.ForeignKey(
                        name: "FK_Saved_Post_PostID",
                        column: x => x.PostID,
                        principalTable: "Post",
                        principalColumn: "ID");
                    table.ForeignKey(
                        name: "FK_Saved_User_UserID",
                        column: x => x.UserID,
                        principalTable: "User",
                        principalColumn: "ID");
                });

            migrationBuilder.CreateIndex(
                name: "IX_Like_PostID",
                table: "Like",
                column: "PostID");

            migrationBuilder.CreateIndex(
                name: "IX_Like_UserID",
                table: "Like",
                column: "UserID");

            migrationBuilder.CreateIndex(
                name: "IX_Saved_PostID",
                table: "Saved",
                column: "PostID");

            migrationBuilder.CreateIndex(
                name: "IX_Saved_UserID",
                table: "Saved",
                column: "UserID");

            migrationBuilder.AddForeignKey(
                name: "FK_Subscriptions_User_UsersID",
                table: "Subscriptions",
                column: "UsersID",
                principalTable: "User",
                principalColumn: "ID",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Subscriptions_User_UsersID",
                table: "Subscriptions");

            migrationBuilder.DropTable(
                name: "Like");

            migrationBuilder.DropTable(
                name: "Saved");

            migrationBuilder.DropColumn(
                name: "UserSubscriptionID",
                table: "Subscriptions");

            migrationBuilder.DropColumn(
                name: "UserWriterID",
                table: "Subscriptions");

            migrationBuilder.RenameColumn(
                name: "UsersID",
                table: "Subscriptions",
                newName: "UserID");

            migrationBuilder.RenameIndex(
                name: "IX_Subscriptions_UsersID",
                table: "Subscriptions",
                newName: "IX_Subscriptions_UserID");

            migrationBuilder.AddForeignKey(
                name: "FK_Subscriptions_User_UserID",
                table: "Subscriptions",
                column: "UserID",
                principalTable: "User",
                principalColumn: "ID",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
