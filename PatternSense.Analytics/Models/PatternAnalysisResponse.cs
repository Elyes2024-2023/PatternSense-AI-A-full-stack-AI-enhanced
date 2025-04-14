namespace PatternSense.Analytics.Models
{
    public class PatternAnalysisResponse
    {
        public string PatternType { get; set; } = string.Empty;
        public int Duplicates { get; set; }
        public string Description { get; set; } = string.Empty;
        public AdvancedPatternAnalysis AdvancedAnalysis { get; set; } = new();
    }

    public class AdvancedPatternAnalysis
    {
        public bool IsArithmeticSequence { get; set; }
        public bool IsGeometricSequence { get; set; }
        public bool IsSymmetric { get; set; }
        public double? CommonDifference { get; set; }
        public double? CommonRatio { get; set; }
        public string Trend { get; set; } = string.Empty;
        public List<string> AdditionalPatterns { get; set; } = new();
    }
} 