using System.ComponentModel.DataAnnotations;

namespace Bom.Blog.Tags
{
    public class CreateOrUpdateTagDto
    {
        [Required]
        [StringLength(TagConst.MaxNameLength)]
        public string TagName { get; set; }
        [Required]
        [StringLength(TagConst.MaxDisplayNameLength)]
        public string DisplayName { get; set; }
    }
}
