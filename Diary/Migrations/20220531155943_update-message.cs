using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Diary.Migrations
{
    public partial class updatemessage : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "User",
                keyColumn: "ID",
                keyValue: new Guid("1057db33-a1cd-4547-80a5-07e67e1bcaaf"));

            migrationBuilder.DropColumn(
                name: "Status",
                table: "Message");

            migrationBuilder.AddColumn<bool>(
                name: "IsSeen",
                table: "Message",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "IsStatus",
                table: "Message",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.InsertData(
                table: "User",
                columns: new[] { "ID", "About", "Email", "Font", "Gender", "Icon", "IsBan", "IsBlok", "Name", "TimeBan" },
                values: new object[] { new Guid("63f0ab0e-013c-4427-8bb0-aed43e1526c1"), null, "toni_naumov_1990@mail.ru", null, null, null, null, null, "Admin", null });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "User",
                keyColumn: "ID",
                keyValue: new Guid("63f0ab0e-013c-4427-8bb0-aed43e1526c1"));

            migrationBuilder.DropColumn(
                name: "IsSeen",
                table: "Message");

            migrationBuilder.DropColumn(
                name: "IsStatus",
                table: "Message");

            migrationBuilder.AddColumn<string>(
                name: "Status",
                table: "Message",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.InsertData(
                table: "User",
                columns: new[] { "ID", "About", "Email", "Font", "Gender", "Icon", "IsBan", "IsBlok", "Name", "TimeBan" },
                values: new object[] { new Guid("1057db33-a1cd-4547-80a5-07e67e1bcaaf"), null, "toni_naumov_1990@mail.ru", null, null, null, null, null, "Admin", null });
        }
    }
}
