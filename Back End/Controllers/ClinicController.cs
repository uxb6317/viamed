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
    public class ClinicController : ControllerBase
    {
        private readonly IClinicService _clinicService;
        private readonly ITextValueService _textValueService;
        private readonly ITextLocalisationService _localisationService;
        private readonly IClinicCategoryService _clinicCategoryService;
        private readonly ILogger<ClinicController> _logger;

        public ClinicController(IClinicService clinicService, ITextValueService textValueService, ITextLocalisationService textLocalisationService, IClinicCategoryService clinicCategoryService, ILogger<ClinicController> logger)
        {
            _clinicService = clinicService;
            _textValueService = textValueService;
            _localisationService = textLocalisationService;
            _clinicCategoryService = clinicCategoryService;
            _logger = logger;
        }
        
        [HttpGet("all")]
        public IActionResult GetAll([FromQuery(Name = "lang")] string language)
        {
            var locale = _localisationService.GetTextLocaleId(language).GetValueOrDefault(1);
            var clinics = _clinicService.GetAllClinics();
            foreach (var clinic in clinics)
            {
                clinic.Name = _textValueService.GetText(clinic.NameId, locale);
                clinic.Description = _textValueService.GetText(clinic.DescriptionId, locale);
                clinic.ClinicCategory = _clinicCategoryService.GetClinicCategoryById(clinic.ClinicCategoryId);
                clinic.ClinicCategory.ClinicCategoryName =
                    _textValueService.GetText(clinic.ClinicCategory.ClinicCategoryNameId, locale);
            }
            return Ok(clinics);
        }

        [HttpGet("clinic")]
        public IActionResult GetClinicById([FromQuery(Name = "lang")] string language, [FromQuery(Name = "clinicId")] int clinicId)
        {
            var locale = _localisationService.GetTextLocaleId(language).GetValueOrDefault(1);
            var clinic = _clinicService.GetClinicById(clinicId);
            clinic.Name = _textValueService.GetText(clinic.NameId, locale);
            clinic.Description = _textValueService.GetText(clinic.DescriptionId, locale);
            clinic.ClinicCategory = _clinicCategoryService.GetClinicCategoryById(clinic.ClinicCategoryId);
            clinic.ClinicCategory.ClinicCategoryName =
                _textValueService.GetText(clinic.ClinicCategory.ClinicCategoryNameId, locale);
            return Ok(clinic);
        }
        
        [HttpGet("category")]
        public IActionResult GetAllByCategory([FromQuery(Name = "lang")] string language, [FromQuery(Name = "clinicCategory")] int clinicCategory)
        {
            var locale = _localisationService.GetTextLocaleId(language).GetValueOrDefault(1);
            var clinics = _clinicService.GetAllClinicsByClinicCategory(clinicCategory);
            foreach (var clinic in clinics)
            {
                clinic.Name = _textValueService.GetText(clinic.NameId, locale);
                clinic.Description = _textValueService.GetText(clinic.DescriptionId, locale);
                clinic.ClinicCategory = _clinicCategoryService.GetClinicCategoryById(clinic.ClinicCategoryId);
                clinic.ClinicCategory.ClinicCategoryName =
                    _textValueService.GetText(clinic.ClinicCategory.ClinicCategoryNameId, locale);
            }
            return Ok(clinics);
        }
    }
}