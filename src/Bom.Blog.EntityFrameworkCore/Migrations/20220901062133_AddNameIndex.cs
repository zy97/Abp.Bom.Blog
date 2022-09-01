using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Bom.Blog.Migrations
{
    public partial class AddNameIndex : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateIndex(
                name: "IX_AppCategories_Name",
                table: "AppCategories",
                column: "Name");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_AppCategories_Name",
                table: "AppCategories");
        }
    }
}
