using Microsoft.EntityFrameworkCore;

namespace HealthTourism.Models
{
    public class ApiContext : DbContext
    {
        public ApiContext(DbContextOptions<ApiContext> options)
            : base(options)
        { }
        public DbSet<User> Users { get; set; }
        public DbSet<Clinic> Clinics { get; set; }
        public DbSet<Text> Text { get; set; }
        public DbSet<TextLocalisation> TextLocalisation { get; set; }
        public DbSet<TextValue> TextValue { get; set; }
        public DbSet<ServiceCategory> ServiceCategories { get; set; }
        public DbSet<ClinicServiceModel> ClinicServices { get; set; }
        public DbSet<ClinicCategory> ClinicCategories { get; set; }
    }
}