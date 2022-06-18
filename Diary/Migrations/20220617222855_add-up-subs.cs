using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Diary.Migrations
{
    public partial class addupsubs : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "User",
                keyColumn: "ID",
                keyValue: new Guid("81f7daba-c626-4caf-a9b8-9bd7b0833aa9"));

            migrationBuilder.InsertData(
                table: "User",
                columns: new[] { "ID", "About", "Email", "Font", "Gender", "Icon", "IsBan", "IsBlok", "Name", "TimeBan" },
                values: new object[] { new Guid("37db172b-a671-4413-982a-6a4c3119b562"), null, "toni_naumov_1990@mail.ru", null, null, null, null, null, "Admin", null });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "User",
                keyColumn: "ID",
                keyValue: new Guid("37db172b-a671-4413-982a-6a4c3119b562"));

            migrationBuilder.InsertData(
                table: "User",
                columns: new[] { "ID", "About", "Email", "Font", "Gender", "Icon", "IsBan", "IsBlok", "Name", "TimeBan" },
                values: new object[] { new Guid("81f7daba-c626-4caf-a9b8-9bd7b0833aa9"), null, "toni_naumov_1990@mail.ru", null, null, null, null, null, "Admin", null });
        }
    }
}
