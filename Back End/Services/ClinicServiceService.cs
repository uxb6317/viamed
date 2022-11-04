using System;
using System.Collections;
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
using Microsoft.EntityFrameworkCore.Storage;


namespace HealthTourism.Services
{
    public interface IClinicServiceService
    {
        IEnumerable<ClinicServiceModel> GetAllClinicServices();
        int CountServiceProvidersForServiceCategory(int serviceCategory);
        IEnumerable<ClinicServiceModel> GetAllClinicsServices(int clinicId);
        IEnumerable<Clinic> GetAllClinicsByServiceCategory(int serviceCategory);
        ClinicServiceModel GetClinicService(int clinicServiceId);
    }

    public class ClinicServiceService : IClinicServiceService
    {
        private readonly AppSettings _appSettings;
        private readonly ApiContext _apiContext;
        private readonly ILogger<IClinicServiceService> _logger;


        public ClinicServiceService(IOptions<AppSettings> appSettings, ApiContext apiContext,
            ILogger<IClinicServiceService> logger)
        {
            _appSettings = appSettings.Value;
            _apiContext = apiContext;
            _logger = logger;
        }
        
        public IEnumerable<ClinicServiceModel> GetAllClinicServices()
        {
            return _apiContext.ClinicServices.ToListAsync().Result;
        }
        
        public IEnumerable<ClinicServiceModel> GetAllClinicsServices(int clinicId)
        {
            return _apiContext.ClinicServices.Where(c => c.ClinicId == clinicId).ToList();
        }
        
        public int CountServiceProvidersForServiceCategory(int serviceCategory)
        {
            
            var count = _apiContext.ClinicServices.Where(c => c.ServiceCategoryId == serviceCategory).GroupBy(c => c.ServiceCategoryId)
                 .Select(a => new { name = a.Key, count = a.Count() })
                 .ToDictionary(k => k.name, i => i.count);
            // SELECT COUNT(DISTINCT(clinic_id)) FROM clinic_service WHERE service_category = 2 GROUP BY service_category;
             return count.FirstOrDefault().Value;
            
        }
        
        public IEnumerable<Clinic> GetAllClinicsByServiceCategory(int serviceCategory)
        {
            var services = _apiContext.ClinicServices.Where(c => c.ServiceCategoryId == serviceCategory).ToList();
            var clinicIds = new List<int>();
            foreach (var clinicService in services.Where(clinicService => !clinicIds.Contains(clinicService.ClinicId)))
            {
                clinicIds.Add(clinicService.ClinicId);
            }

            return clinicIds.Select(clinicId => _apiContext.Clinics.FirstOrDefault(c => c.ClinicId == clinicId)).ToList();
        }
        
        public ClinicServiceModel GetClinicService(int clinicServiceId)
        {
            return _apiContext.ClinicServices.FirstOrDefault(c => c.ClinicServiceId == clinicServiceId);
        }
    
    }
}