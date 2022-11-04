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
    public interface IServiceCategoryService
    {
        IEnumerable<ServiceCategory> GetAllServiceCategories();
        ServiceCategory GetServiceCategory(int serviceId);
    }

    public class ServiceCategoryService : IServiceCategoryService
    {
        private readonly AppSettings _appSettings;
        private readonly ApiContext _apiContext;
        private readonly ILogger<IServiceCategoryService> _logger;


        public ServiceCategoryService(IOptions<AppSettings> appSettings, ApiContext apiContext,
            ILogger<IServiceCategoryService> logger)
        {
            _appSettings = appSettings.Value;
            _apiContext = apiContext;
            _logger = logger;
        }

        public IEnumerable<ServiceCategory> GetAllServiceCategories()
        {
            return _apiContext.ServiceCategories.ToListAsync().Result;
        }
        
        public ServiceCategory GetServiceCategory(int serviceCategoryId)
        {
            return _apiContext.ServiceCategories.FirstOrDefault(c => c.ServiceCategoryId == serviceCategoryId);
        }
        
    }
}