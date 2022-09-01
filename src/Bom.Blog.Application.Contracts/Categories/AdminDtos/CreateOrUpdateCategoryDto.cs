using System.ComponentModel.DataAnnotations;

namespace Bom.Blog.Categories.AdminDtos
{
    public class CreateOrUpdateCategoryDto
    {
        [Required]
        [StringLength(CategoryConst.MaxNameLength)]
        public string Name { get; set; }
        [Required]
        [StringLength(CategoryConst.MaxDisplayNameLength)]
        public string DisplayName { get; set; }
    }
}
