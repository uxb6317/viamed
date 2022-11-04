using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Text.RegularExpressions;
using HealthTourism.Models;
using HealthTourism.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace HealthTourism.Controllers
{
    [Authorize]
    [ApiController]
    [Route("healthApi/[controller]")]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;
        private readonly ILogger<UserController> _logger;

        public UserController(IUserService userService, ILogger<UserController> logger) {
            this._userService = userService;
            this._logger = logger;
        }
        
        [AllowAnonymous]
        [HttpPost("login")]
        public IActionResult Authenticate([FromBody] User user) {
            var u = _userService.Authenticate(user.Email, user.Password);
            _logger.LogInformation(user.Password);
            
            if (u == null)
                return BadRequest(new {message = "Username or password is incorrect"});
            // TODO:

            return Ok(u.WithoutPassword());
        }

        /**
         * 
         */
        [AllowAnonymous]
        [HttpPost("register")]
        public IActionResult Register([FromBody] User user) {
            _logger.Log(LogLevel.Information, $"Registration received: {user}");
            
            // Validate email 
            var pattern = "(^\\w+([-+.']\\w+)*@\\w+([-.]\\w+)*\\.\\w+([-.]\\w+)*$)";
            Regex emailRegex = new Regex(pattern);
            if (!emailRegex.IsMatch(user.Email))
            {
                _logger.Log(LogLevel.Error,
                    $"The email is not valid: {user.Email}");
                return BadRequest(
                    new {message = "The email is not valid."});
            }
            
            // Check for duplicate email
            if (!(_userService.GetByEmail(user.Email) is null)) {
                _logger.Log(LogLevel.Error,
                    $"The email is already taken: {user.Email}");
                return BadRequest(
                    new {message ="The email is already taken."});
            }

            // Check password criteria
            if (!(user.Password is null) && !Regex.Match(user.Password,
                        @"^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[!@#$%^&*()_+])[a-zA-Z0-9!@#$%^&*()_+]{5,}$")
                    .Success) {
                _logger.Log(LogLevel.Error,
                    $"The password does not fulfill all the restrictions. Password {user.Password}");
                return BadRequest(
                    new {message ="Your password must be at least 5 characters long, contain at least one number and special character " +
                                  " and have a mixture of uppercase and lowercase letters."});
            }

            try {
                _userService.Create(user);
                _logger.Log(LogLevel.Information, $"Successfully created user: {user}");
                user.Token = _userService.GenerateJwtToken(user);
                return Ok(user.WithoutPassword());
            }
            catch (Exception e) {
                _logger.LogError("Error occurred while trying to insert new user.\n{e}", e);
                return StatusCode(500);
            }
        }
        
        [HttpGet("profile")]
        public IActionResult GetUser()
        {
            var email = "";
            if (HttpContext.User.Identity is ClaimsIdentity identity)
            {
                var claim = identity.Claims.FirstOrDefault()?.Value;
                if (claim != null)
                {
                    email = claim;
                }
            }
            var u = _userService.GetByEmail(email);
            if (u == null)
                return StatusCode(500);
            return Ok(u.WithoutPassword());
        }
    }
}