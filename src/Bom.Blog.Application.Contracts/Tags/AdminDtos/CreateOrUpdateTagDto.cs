using System.ComponentModel.DataAnnotations;

namespace Bom.Blog.Tags.AdminDtos
{
    public class CreateOrUpdateTagDto
    {
        [Required]
        [StringLength(TagConst.MaxNameLength)]
        public string Name { get; set; }
        [Required]
        [StringLength(TagConst.MaxDisplayNameLength)]
        public string DisplayName { get; set; }
    }
}
