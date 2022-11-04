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
using Microsoft.EntityFrameworkCore;


namespace HealthTourism.Services
{
    public interface IClinicCategoryService
    {
        IEnumerable<ClinicCategory> GetAllClinicCategories();
        ClinicCategory GetClinicCategoryById(int clinicCategoryId);

    }

    public class ClinicCategoryService : IClinicCategoryService
    {
        private readonly AppSettings _appSettings;
        private readonly ApiContext _apiContext;
        private readonly ILogger<IClinicCategoryService> _logger;


        public ClinicCategoryService(IOptions<AppSettings> appSettings, ApiContext apiContext,
            ILogger<IClinicCategoryService> logger)
        {
            _appSettings = appSettings.Value;
            _apiContext = apiContext;
            _logger = logger;
        }
        
        public IEnumerable<ClinicCategory> GetAllClinicCategories()
        {
            return _apiContext.ClinicCategories.ToListAsync().Result;
        }
    
        public ClinicCategory GetClinicCategoryById(int clinicCategoryId)
        {
            return _apiContext.ClinicCategories.FirstOrDefault(c => c.ClinicCategoryId == clinicCategoryId);
        }

    }
}