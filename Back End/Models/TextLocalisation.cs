using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace HealthTourism.Models 
{
    [Table("text_localisation")]
    public class TextLocalisation
    {
        [Key]
        [Column("text_localisation_id")]
        [JsonIgnore]
        public int TextLocalisationId{ get; set; }
        [Column("locale")]
        public string Locale { get; set; }
        
    }
}