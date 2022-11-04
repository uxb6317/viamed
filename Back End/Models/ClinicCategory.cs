using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace HealthTourism.Models 
{
    [Table("clinic_category")]
    public class ClinicCategory
    {
        [Key]
        [Column("clinic_category_id")]
        public int ClinicCategoryId{ get; set; }
        [Column("clinic_category_name")]
        [JsonIgnore]
        public int ClinicCategoryNameId { get; set; }

        [NotMapped] 
        public string ClinicCategoryName { get; set; }

    }
}