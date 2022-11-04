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
    public class ClinicServiceController : ControllerBase
    {
        private readonly IClinicService _clinicService;
        private readonly ITextValueService _textValueService;
        private readonly ITextLocalisationService _localisationService;
        private readonly IClinicServiceService _clinicServiceService;
        private readonly IServiceCategoryService _serviceCategoryService;
        private readonly IClinicCategoryService _clinicCategoryService;
        private readonly ILogger<ClinicServiceController> _logger;

        public ClinicServiceController(IClinicService clinicService, ITextValueService textValueService, ITextLocalisationService textLocalisationService, IClinicServiceService clinicServiceService, IServiceCategoryService serviceCategoryService, IClinicCategoryService clinicCategoryService,  ILogger<ClinicServiceController> logger)
        {
            _clinicService = clinicService;
            _textValueService = textValueService;
            _localisationService = textLocalisationService;
            _clinicServiceService =  clinicServiceService;
            _serviceCategoryService = serviceCategoryService;
            _clinicCategoryService = clinicCategoryService;
            _logger = logger;
        }
        
        [HttpGet("categories")]
        public IActionResult GetAllServiceCategories([FromQuery(Name = "lang")] string language)
        {
            var locale = _localisationService.GetTextLocaleId(language).GetValueOrDefault(1);
            var categories = _serviceCategoryService.GetAllServiceCategories();
            foreach (var category in categories)
            {
                category.ServiceCategoryName = _textValueService.GetText(category.ServiceCategoryNameId, locale);
                category.ServiceCategoryProvidersCount = _clinicServiceService.CountServiceProvidersForServiceCategory(category.ServiceCategoryId);

            }
            return Ok(categories);
        }
        
        [HttpGet("clinicCategory")]
        public IActionResult GetClinicsServices([FromQuery(Name = "lang")] string language, [FromQuery(Name = "clinicId")] int clinicId)
        {
            var locale = _localisationService.GetTextLocaleId(language).GetValueOrDefault(1);
            var services = _clinicServiceService.GetAllClinicsServices(clinicId);
            foreach (var service in services)
            {
                service.ClinicServiceName = _textValueService.GetText(service.ClinicServiceNameId, locale);
                service.ClinicServiceDescription = _textValueService.GetText(service.ClinicServiceDesc, locale); 
                service.ClinicServiceName = _textValueService.GetText(service.ClinicServiceNameId, locale);
                service.ClinicName = _textValueService.GetText(_clinicService.GetClinicName(service.ClinicId).GetValueOrDefault(0), locale);
                service.ServiceCategory = _serviceCategoryService.GetServiceCategory(service.ServiceCategoryId);
                service.ServiceCategory.ServiceCategoryName =
                    _textValueService.GetText(service.ServiceCategory.ServiceCategoryNameId, locale);
                service.ServiceCategory.ServiceCategoryProvidersCount = _clinicServiceService.CountServiceProvidersForServiceCategory(service.ServiceCategory.ServiceCategoryId);

            }
            return Ok(services);
        }
        
        [HttpGet("serviceCategory")]
        public IActionResult GetAllClinicsByServiceCategory([FromQuery(Name = "lang")] string language, [FromQuery(Name = "serviceCategoryId")] int serviceCategoryId)
        {
            var locale = _localisationService.GetTextLocaleId(language).GetValueOrDefault(1);
            var clinics = _clinicServiceService.GetAllClinicsByServiceCategory(serviceCategoryId);
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
        
        [HttpGet("service")]
        public IActionResult GetClinicServiceById([FromQuery(Name = "lang")] string language, [FromQuery(Name = "clinicServiceId")] int clinicServiceId)
        {
            var locale = _localisationService.GetTextLocaleId(language).GetValueOrDefault(1);
            var service = _clinicServiceService.GetClinicService(clinicServiceId);
            service.ClinicServiceName = _textValueService.GetText(service.ClinicServiceNameId, locale);
            service.ClinicServiceDescription = _textValueService.GetText(service.ClinicServiceDesc, locale); 
            service.ClinicServiceName = _textValueService.GetText(service.ClinicServiceNameId, locale);
            service.ClinicName = _textValueService.GetText(_clinicService.GetClinicName(service.ClinicId).GetValueOrDefault(0), locale);
            service.ServiceCategory = _serviceCategoryService.GetServiceCategory(service.ServiceCategoryId);
            service.ServiceCategory.ServiceCategoryName =
                _textValueService.GetText(service.ServiceCategory.ServiceCategoryNameId, locale);
            service.ServiceCategory.ServiceCategoryProvidersCount = _clinicServiceService.CountServiceProvidersForServiceCategory(service.ServiceCategory.ServiceCategoryId);
            return Ok(service);
        }

    }
}