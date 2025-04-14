using PatternSense.Analytics.Models;
using System.Text.Json;

namespace PatternSense.Analytics.Services
{
    public interface IAdvancedPatternAnalysisService
    {
        Task<PatternAnalysisResponse> AnalyzePatternAsync(int[] numbers);
        Task<AdvancedPatternAnalysis> PerformAdvancedAnalysisAsync(int[] numbers);
    }

    public class AdvancedPatternAnalysisService : IAdvancedPatternAnalysisService
    {
        private readonly HttpClient _httpClient;
        private readonly ILogger<AdvancedPatternAnalysisService> _logger;
        private readonly IConfiguration _configuration;

        public AdvancedPatternAnalysisService(
            HttpClient httpClient,
            ILogger<AdvancedPatternAnalysisService> logger,
            IConfiguration configuration)
        {
            _httpClient = httpClient;
            _logger = logger;
            _configuration = configuration;
            
            // Configure the HttpClient to call the Java API
            _httpClient.BaseAddress = new Uri(_configuration["ApiSettings:JavaApiUrl"] ?? "http://localhost:8080/api");
        }

        public async Task<PatternAnalysisResponse> AnalyzePatternAsync(int[] numbers)
        {
            try
            {
                // First, get the basic pattern analysis from the Java API
                var javaApiResponse = await GetBasicPatternAnalysisAsync(numbers);
                
                // Then, perform advanced analysis
                var advancedAnalysis = await PerformAdvancedAnalysisAsync(numbers);
                
                // Combine the results
                var response = new PatternAnalysisResponse
                {
                    PatternType = javaApiResponse.PatternType,
                    Duplicates = javaApiResponse.Duplicates,
                    Description = javaApiResponse.Description,
                    AdvancedAnalysis = advancedAnalysis
                };
                
                return response;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error analyzing pattern");
                throw;
            }
        }

        private async Task<dynamic> GetBasicPatternAnalysisAsync(int[] numbers)
        {
            try
            {
                var response = await _httpClient.PostAsJsonAsync("/patterns/analyze", numbers);
                response.EnsureSuccessStatusCode();
                
                var content = await response.Content.ReadAsStringAsync();
                return JsonSerializer.Deserialize<dynamic>(content);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error calling Java API");
                throw;
            }
        }

        public async Task<AdvancedPatternAnalysis> PerformAdvancedAnalysisAsync(int[] numbers)
        {
            var analysis = new AdvancedPatternAnalysis();
            
            // Check for arithmetic sequence
            if (IsArithmeticSequence(numbers, out double? commonDifference))
            {
                analysis.IsArithmeticSequence = true;
                analysis.CommonDifference = commonDifference;
                analysis.AdditionalPatterns.Add("Arithmetic Sequence");
            }
            
            // Check for geometric sequence
            if (IsGeometricSequence(numbers, out double? commonRatio))
            {
                analysis.IsGeometricSequence = true;
                analysis.CommonRatio = commonRatio;
                analysis.AdditionalPatterns.Add("Geometric Sequence");
            }
            
            // Check for symmetry
            if (IsSymmetric(numbers))
            {
                analysis.IsSymmetric = true;
                analysis.AdditionalPatterns.Add("Symmetric Pattern");
            }
            
            // Determine trend
            analysis.Trend = DetermineTrend(numbers);
            
            return analysis;
        }

        private bool IsArithmeticSequence(int[] numbers, out double? commonDifference)
        {
            commonDifference = null;
            
            if (numbers.Length < 2)
                return false;
                
            double diff = numbers[1] - numbers[0];
            commonDifference = diff;
            
            for (int i = 1; i < numbers.Length - 1; i++)
            {
                if (Math.Abs((numbers[i + 1] - numbers[i]) - diff) > 0.0001)
                {
                    commonDifference = null;
                    return false;
                }
            }
            
            return true;
        }

        private bool IsGeometricSequence(int[] numbers, out double? commonRatio)
        {
            commonRatio = null;
            
            if (numbers.Length < 2 || numbers[0] == 0)
                return false;
                
            double ratio = (double)numbers[1] / numbers[0];
            commonRatio = ratio;
            
            for (int i = 1; i < numbers.Length - 1; i++)
            {
                if (numbers[i] == 0 || Math.Abs((double)numbers[i + 1] / numbers[i] - ratio) > 0.0001)
                {
                    commonRatio = null;
                    return false;
                }
            }
            
            return true;
        }

        private bool IsSymmetric(int[] numbers)
        {
            if (numbers.Length % 2 != 0)
            {
                // For odd-length arrays, check if the middle element is the pivot
                int mid = numbers.Length / 2;
                for (int i = 0; i < mid; i++)
                {
                    if (numbers[i] != numbers[numbers.Length - 1 - i])
                        return false;
                }
            }
            else
            {
                // For even-length arrays, check if the array is symmetric around the middle
                for (int i = 0; i < numbers.Length / 2; i++)
                {
                    if (numbers[i] != numbers[numbers.Length - 1 - i])
                        return false;
                }
            }
            
            return true;
        }

        private string DetermineTrend(int[] numbers)
        {
            if (numbers.Length < 2)
                return "Insufficient data";
                
            bool increasing = true;
            bool decreasing = true;
            
            for (int i = 1; i < numbers.Length; i++)
            {
                if (numbers[i] <= numbers[i - 1])
                    increasing = false;
                    
                if (numbers[i] >= numbers[i - 1])
                    decreasing = false;
                    
                if (!increasing && !decreasing)
                    break;
            }
            
            if (increasing)
                return "Strictly Increasing";
            else if (decreasing)
                return "Strictly Decreasing";
            else
                return "Fluctuating";
        }
    }
} 