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
    public interface ITextLocalisationService
    {
        int? GetTextLocaleId(string locale);
    }

    public class TextLocalisationService : ITextLocalisationService
    {
        private readonly AppSettings _appSettings;
        private readonly ApiContext _apiContext;
        private readonly ILogger<ITextLocalisationService> _logger;


        public TextLocalisationService(IOptions<AppSettings> appSettings, ApiContext apiContext,
            ILogger<ITextLocalisationService> logger)
        {
            _appSettings = appSettings.Value;
            _apiContext = apiContext;
            _logger = logger;
        }
        
        public int? GetTextLocaleId(string locale)
        {
            return _apiContext.TextLocalisation.FirstOrDefault(textLocalisation => String.Equals(textLocalisation.Locale, locale, StringComparison.CurrentCultureIgnoreCase))?.TextLocalisationId;
        }
    
    }
}