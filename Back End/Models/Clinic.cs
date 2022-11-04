using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace HealthTourism.Models 
{
    [Table("clinic")]
    public class Clinic
    {
        [Key]
        [Column("clinic_id")]
        public int ClinicId{ get; set; }
        [Column("name")]
        [JsonIgnore]
        public int NameId { get; set; }
        [Column("address")]
        public string Address { get; set; }
        [Column("crm")]
        public string Crm { get; set; }
        [Column("phone_number")]
        public string PhoneNumber { get; set; }
        [Column("phone_number2")]
        public string PhoneNumber2 { get; set; }
        [Column("email")]
        public string Email { get; set; }
        [Column("image")]
        public string Image { get; set; }
        [Column("description")]
        [JsonIgnore]
        public int DescriptionId { get; set; }
        [Column("category")]
        [JsonIgnore]
        public int ClinicCategoryId { get; set; }

        [NotMapped]
        public string Name { get; set; }
        [NotMapped]

        public string Description { get; set; }

        [NotMapped] 
        public ClinicCategory ClinicCategory { get; set; }

    }
}