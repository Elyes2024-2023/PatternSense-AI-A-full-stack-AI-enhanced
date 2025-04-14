using PatternSense.Analytics.Services;

namespace PatternSense.Analytics.Extensions
{
    public static class ServiceCollectionExtensions
    {
        public static IServiceCollection AddPatternAnalysisServices(this IServiceCollection services)
        {
            services.AddHttpClient<IAdvancedPatternAnalysisService, AdvancedPatternAnalysisService>();
            services.AddScoped<IAdvancedPatternAnalysisService, AdvancedPatternAnalysisService>();
            
            return services;
        }
    }
} 