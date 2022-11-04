using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using HealthTourism.Models;
using HealthTourism.Settings;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using BCrypt.Net;
using Microsoft.EntityFrameworkCore;


namespace HealthTourism.Services
{
    public interface IClinicService
    {
        IEnumerable<Clinic> GetAllClinics();
        IEnumerable<Clinic> GetAllClinicsByClinicCategory(int clinicCategory);
        int? GetClinicName(int clinicId);
        Clinic GetClinicById(int clinicId);
    }

    public class ClinicService : IClinicService
    {
        private readonly AppSettings _appSettings;
        private readonly ApiContext _apiContext;
        private readonly ILogger<IClinicService> _logger;


        public ClinicService(IOptions<AppSettings> appSettings, ApiContext apiContext,
            ILogger<IClinicService> logger)
        {
            _appSettings = appSettings.Value;
            _apiContext = apiContext;
            _logger = logger;
        }
        
        public IEnumerable<Clinic> GetAllClinics()
        {
            return _apiContext.Clinics.ToListAsync().Result;
        }

        public IEnumerable<Clinic> GetAllClinicsByClinicCategory(int clinicCategory)
        {
            return _apiContext.Clinics.Where(c => c.ClinicCategoryId == clinicCategory).ToList();
        }

        public int? GetClinicName(int clinicId)
        {
            return _apiContext.Clinics.FirstOrDefault(c => c.ClinicId == clinicId)?.NameId;
        }
        
        public Clinic GetClinicById(int clinicId)
        {
            return _apiContext.Clinics.FirstOrDefault(c => c.ClinicId == clinicId);
        }
    }
}