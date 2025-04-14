using System.ComponentModel.DataAnnotations;

namespace PatternSense.Analytics.Models
{
    public class PatternAnalysisRequest
    {
        [Required]
        [MinLength(5)]
        [MaxLength(5)]
        public int[] Numbers { get; set; } = Array.Empty<int>();
    }
} 