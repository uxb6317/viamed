using System;
using System.Text.RegularExpressions;
using HealthTourism.Models;
using HealthTourism.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace HealthTourism.Controllers
{
    [Authorize]
    [ApiController]
    [Route("healthApi/[controller]")]
    public class ClinicCategoryController : ControllerBase
    {
        private readonly ITextValueService _textValueService;
        private readonly ITextLocalisationService _localisationService;
        private readonly IClinicCategoryService _clinicCategoryService;
        private readonly ILogger<ClinicCategoryController> _logger;

        public ClinicCategoryController(ITextValueService textValueService, ITextLocalisationService textLocalisationService, IClinicCategoryService clinicCategoryService, ILogger<ClinicCategoryController> logger)
        {
            _textValueService = textValueService;
            _localisationService = textLocalisationService;
            _clinicCategoryService = clinicCategoryService;
            _logger = logger;
        }
        
        [HttpGet("all")]
        public IActionResult GetAll([FromQuery(Name = "lang")] string language)
        {
            var locale = _localisationService.GetTextLocaleId(language).GetValueOrDefault(1);
            var categories = _clinicCategoryService.GetAllClinicCategories();
            foreach (var category in categories)
            {
                category.ClinicCategoryName = _textValueService.GetText(category.ClinicCategoryNameId, locale);
            }
            return Ok(categories);
        }


    }
}