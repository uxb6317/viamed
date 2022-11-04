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
    public interface ITextValueService
    {
        public string GetText(int textId, int textLocalisationId);
    }

    public class TextValueService : ITextValueService
    {
        private readonly AppSettings _appSettings;
        private readonly ApiContext _apiContext;
        private readonly ILogger<ITextValueService> _logger;
        
        public TextValueService(IOptions<AppSettings> appSettings, ApiContext apiContext,
            ILogger<ITextValueService> logger)
        {
            _appSettings = appSettings.Value;
            _apiContext = apiContext;
            _logger = logger;
        }
        
        public string GetText(int textId, int textLocalisationId)
        {
            var value = _apiContext.TextValue.FirstOrDefault(t => t.TextId == textId && t.TextLocalisationId == textLocalisationId);
            return value?.Value;
        }

    }
}