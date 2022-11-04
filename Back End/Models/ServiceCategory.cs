using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace HealthTourism.Models 
{
    [Table("service_category")]
    public class ServiceCategory
    {
        [Key]
        [Column("service_id")]
        public int ServiceCategoryId{ get; set; }
        [Column("service_name")]
        [JsonIgnore]
        public int ServiceCategoryNameId { get; set; }

        [NotMapped]
        public string ServiceCategoryName { get; set; }
        [NotMapped]
        public int ServiceCategoryProvidersCount { get; set; }
    }
}