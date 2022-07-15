using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Bom.Blog.Migrations
{
    public partial class RemoveHtmlProperty : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Html",
                table: "AppPosts");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Html",
                table: "AppPosts",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }
    }
}
