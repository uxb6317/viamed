using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace HealthTourism.Models 
{
    [Table("text_value")]
    public class TextValue
    {
        [Key]
        [Column("text_value_id")]
        [Newtonsoft.Json.JsonIgnore]
        public int TextValueId{ get; set; }
        [Column("value")]
        public string Value { get; set; }
        [Column("text_id")]

        public int TextId { get; set; }
        [Column("text_localisation_id")]
        [JsonIgnore]
        public int TextLocalisationId { get; set; }

        [NotMapped]
        public string TextLocalisation { get; set; }
        [NotMapped]
        public string Text { get; set; }
        
    }
}