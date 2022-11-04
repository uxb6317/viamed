using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;
using HealthTourism.Services;

namespace HealthTourism.Models 
{
    [Table("clinic_service")]
    public class ClinicServiceModel
    {
        [Key]
        [Column("clinic_service_id")]
        public int ClinicServiceId{ get; set; }
        [Column("clinic_service_name")]
        [JsonIgnore]
        public int ClinicServiceNameId { get; set; }
        [Column("clinic_service_desc")]
        [JsonIgnore]
        public int ClinicServiceDesc { get; set; }
        [Column("clinic_service_price_range_from")]
        public int ClinicServicePriceRangeFrom { get; set; }
        [Column("clinic_service_price_range_to")]
        public int ClinicServicePriceRangeTo{ get; set; }
        [Column("service_category")]
        [JsonIgnore]
        public int ServiceCategoryId { get; set; }
        [Column("clinic_id")]
        [JsonIgnore]
        public int ClinicId { get; set; }

        [NotMapped]
        public string ClinicServiceName { get; set; }
        [NotMapped]
        public string ClinicServiceDescription { get; set; }
        [NotMapped]
        public ServiceCategory ServiceCategory { get; set; }
        [NotMapped]
        public string ClinicName { get; set; }

    }
}