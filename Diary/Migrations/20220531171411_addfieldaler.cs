using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Diary.Migrations
{
    public partial class addfieldaler : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "User",
                keyColumn: "ID",
                keyValue: new Guid("63f0ab0e-013c-4427-8bb0-aed43e1526c1"));

            migrationBuilder.AddColumn<bool>(
                name: "IsAlert",
                table: "Subscriptions",
                type: "bit",
                nullable: true);

            migrationBuilder.InsertData(
                table: "User",
                columns: new[] { "ID", "About", "Email", "Font", "Gender", "Icon", "IsBan", "IsBlok", "Name", "TimeBan" },
                values: new object[] { new Guid("81f7daba-c626-4caf-a9b8-9bd7b0833aa9"), null, "toni_naumov_1990@mail.ru", null, null, null, null, null, "Admin", null });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "User",
                keyColumn: "ID",
                keyValue: new Guid("81f7daba-c626-4caf-a9b8-9bd7b0833aa9"));

            migrationBuilder.DropColumn(
                name: "IsAlert",
                table: "Subscriptions");

            migrationBuilder.InsertData(
                table: "User",
                columns: new[] { "ID", "About", "Email", "Font", "Gender", "Icon", "IsBan", "IsBlok", "Name", "TimeBan" },
                values: new object[] { new Guid("63f0ab0e-013c-4427-8bb0-aed43e1526c1"), null, "toni_naumov_1990@mail.ru", null, null, null, null, null, "Admin", null });
        }
    }
}
