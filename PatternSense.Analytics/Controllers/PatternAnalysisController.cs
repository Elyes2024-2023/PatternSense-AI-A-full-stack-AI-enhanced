/**
 * PatternAnalysisController
 * 
 * @author  ELYES
 * @copyright Copyright (c) 2024-2025 ELYES. All rights reserved.
 * 
 * This controller handles pattern analysis requests and provides
 * both basic and advanced pattern analysis functionality.
 */

using Microsoft.AspNetCore.Mvc;
using PatternSense.Analytics.Models;
using PatternSense.Analytics.Services;

namespace PatternSense.Analytics.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PatternAnalysisController : ControllerBase
    {
        private readonly IAdvancedPatternAnalysisService _patternAnalysisService;
        private readonly ILogger<PatternAnalysisController> _logger;

        public PatternAnalysisController(
            IAdvancedPatternAnalysisService patternAnalysisService,
            ILogger<PatternAnalysisController> logger)
        {
            _patternAnalysisService = patternAnalysisService;
            _logger = logger;
        }

        [HttpPost("analyze")]
        public async Task<ActionResult<PatternAnalysisResponse>> AnalyzePattern([FromBody] PatternAnalysisRequest request)
        {
            try
            {
                _logger.LogInformation("Analyzing pattern: {Numbers}", string.Join(", ", request.Numbers));
                
                if (request.Numbers.Length != 5)
                {
                    return BadRequest("The input must contain exactly 5 numbers");
                }
                
                var result = await _patternAnalysisService.AnalyzePatternAsync(request.Numbers);
                return Ok(result);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error analyzing pattern");
                return StatusCode(500, "An error occurred while analyzing the pattern");
            }
        }

        [HttpPost("advanced-analysis")]
        public async Task<ActionResult<AdvancedPatternAnalysis>> PerformAdvancedAnalysis([FromBody] PatternAnalysisRequest request)
        {
            try
            {
                _logger.LogInformation("Performing advanced analysis on: {Numbers}", string.Join(", ", request.Numbers));
                
                if (request.Numbers.Length != 5)
                {
                    return BadRequest("The input must contain exactly 5 numbers");
                }
                
                var result = await _patternAnalysisService.PerformAdvancedAnalysisAsync(request.Numbers);
                return Ok(result);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error performing advanced analysis");
                return StatusCode(500, "An error occurred while performing advanced analysis");
            }
        }
    }
} 
