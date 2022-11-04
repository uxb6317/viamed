using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace HealthTourism.Models 
{
    [Table("user")]
    public class User
    {
        [Key]
        public int ClientId { get; set; }

        public string Email { get; set; }
        public string Password { get; set; }
        public string Name { get; set; }
        [NotMapped]
        public string Token { get; set; }

        public User WithoutPassword() {
            Password = null;
            return this;
        }
    }
}