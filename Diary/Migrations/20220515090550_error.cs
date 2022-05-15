using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Diary.Migrations
{
    public partial class error : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "DisplayNumber",
                table: "PostVidio",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "DisplayNumber",
                table: "PostText",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "DisplayNumber",
                table: "PostImage",
                type: "nvarchar(max)",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "DisplayNumber",
                table: "PostVidio");

            migrationBuilder.DropColumn(
                name: "DisplayNumber",
                table: "PostText");

            migrationBuilder.DropColumn(
                name: "DisplayNumber",
                table: "PostImage");
        }
    }
}
