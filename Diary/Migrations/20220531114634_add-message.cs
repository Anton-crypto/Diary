using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Diary.Migrations
{
    public partial class addmessage : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Message",
                columns: table => new
                {
                    ID = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    TimeMessage = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Text = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Status = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    UserID = table.Column<Guid>(type: "uniqueidentifier", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Message", x => x.ID);
                    table.ForeignKey(
                        name: "FK_Message_User_UserID",
                        column: x => x.UserID,
                        principalTable: "User",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.InsertData(
                table: "User",
                columns: new[] { "ID", "About", "Email", "Font", "Gender", "Icon", "IsBan", "IsBlok", "Name", "TimeBan" },
                values: new object[] { new Guid("1057db33-a1cd-4547-80a5-07e67e1bcaaf"), null, "toni_naumov_1990@mail.ru", null, null, null, null, null, "Admin", null });

            migrationBuilder.CreateIndex(
                name: "IX_Message_UserID",
                table: "Message",
                column: "UserID");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Message");

            migrationBuilder.DeleteData(
                table: "User",
                keyColumn: "ID",
                keyValue: new Guid("1057db33-a1cd-4547-80a5-07e67e1bcaaf"));
        }
    }
}
