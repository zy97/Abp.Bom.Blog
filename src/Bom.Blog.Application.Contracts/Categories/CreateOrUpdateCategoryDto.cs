using System.ComponentModel.DataAnnotations;

namespace Bom.Blog.Categories
{
    public class CreateOrUpdateCategoryDto
    {
        [Required]
        [StringLength(CategoryConst.MaxNameLength)]
        public string CategoryName { get; set; }
        [Required]
        [StringLength(CategoryConst.MaxDisplayNameLength)]
        public string DisplayName { get; set; }
    }
}
