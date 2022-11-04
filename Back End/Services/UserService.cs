using System;
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


namespace HealthTourism.Services
{
    public interface IUserService
    {
        User Authenticate(string email, string password);
        User GetByEmail(string email);
        User GetByUserId(string userId);
        int Create(User user);
        string GenerateJwtToken(User user);
    }

    public class UserService : IUserService
    {
        private readonly JwtSecurityTokenHandler tokenHandler;
        private byte[] key;
        private readonly AppSettings appSettings;
        private readonly ApiContext apiContext;
        private readonly ILogger<IUserService> logger;


        public UserService(IOptions<AppSettings> appSettings, ApiContext apiContext,
            ILogger<IUserService> logger)
        {
            this.appSettings = appSettings.Value;
            this.apiContext = apiContext;
            tokenHandler = new JwtSecurityTokenHandler();
            key = Encoding.ASCII.GetBytes(this.appSettings.secret);
            this.logger = logger;
        }

        public User Authenticate(string email, string password)
        {
            User user = null;
            
            if (!string.IsNullOrEmpty(email) && !string.IsNullOrEmpty(password))
            {
                user = apiContext.Users.FirstOrDefault(u => u.Email.ToLower().Equals(email.ToUpper()));
            }

            // No user found
            if (user is null)
                return null;

            // Verify password
            if (!ValidatePassword(password, user.Password)) {
                return null;
            }

            // authentication successful so generate jwt token
            user.Token = this.GenerateJwtToken(user);

            return user;
        }

        public string GenerateJwtToken(User user)
        {
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                    new Claim("email", user.Email)
                }),
                // 1 Day
                Expires = DateTime.UtcNow.AddDays(1),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key),
                    SecurityAlgorithms.HmacSha256Signature)
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);
            return $"Bearer {tokenHandler.WriteToken(token)}";
        }

        public User GetByEmail(string email)
        {
            return apiContext.Users.FirstOrDefault(u => u.Email.ToLower().Equals(email.ToUpper()));
        }

        public User GetByUserId(string userId)
        {
            return apiContext.Users.FirstOrDefault(u => u.ClientId.ToString().ToUpper().Equals(userId.ToUpper()));
        }

        private static string GetRandomSalt()
        {
            return BCrypt.Net.BCrypt.GenerateSalt(12);
        }

        public static string HashPassword(string password)
        {
            return BCrypt.Net.BCrypt.HashPassword(password, GetRandomSalt());
        }

        public static bool ValidatePassword(string password, string correctHash)
        {
            return BCrypt.Net.BCrypt.Verify(password, correctHash);
        }
        
        public int Create(User user) {
            // hash password before storing
            user.Password = HashPassword(user.Password);
            try {
                apiContext.Add(user);
                return apiContext.SaveChanges();
            }
            catch (Exception e) {
                logger.Log(LogLevel.Error, "Error occurred when trying to add new user account.");
                logger.Log(LogLevel.Error, e.Message);
                logger.Log(LogLevel.Error, e.StackTrace);
                return -1;
            }
        }
    }
}