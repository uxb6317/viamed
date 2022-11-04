using System.ComponentModel.DataAnnotations;
 using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace HealthTourism.Models 
 {
     [Table("text")]
     public class Text
     {
         [Key]
         [Column("text_id")]
         [JsonIgnore]
         public int TextId{ get; set; }
         [Column("name")]
         public string Name { get; set; }
         
     }
 }