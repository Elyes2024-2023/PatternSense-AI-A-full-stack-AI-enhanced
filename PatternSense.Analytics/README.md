# PatternSense Analytics (.NET Core)

This is the .NET Core component of the PatternSense AI project, providing advanced pattern analysis capabilities that complement the Java Spring Boot backend.

## Features

- Advanced pattern detection (arithmetic sequences, geometric sequences, symmetry)
- Trend analysis
- Integration with Java Spring Boot backend
- RESTful API
- Swagger documentation
- Serilog logging

## Getting Started

### Prerequisites

- .NET 7.0 SDK or higher
- Visual Studio 2022 or Visual Studio Code
- Java Spring Boot backend running on http://localhost:8080/api

### Building the Project

```bash
dotnet build
```

### Running the Application

```bash
dotnet run
```

The application will start on `https://localhost:5001` (or another port if 5001 is in use)

### API Endpoints

#### Analyze Pattern
- **URL**: `/api/PatternAnalysis/analyze`
- **Method**: POST
- **Body**:
```json
{
  "numbers": [1, 2, 3, 2, 1]
}
```

#### Response Format
```json
{
  "patternType": "HILL",
  "duplicates": 2,
  "description": "Pattern: HILL, Duplicates: 2",
  "advancedAnalysis": {
    "isArithmeticSequence": false,
    "isGeometricSequence": false,
    "isSymmetric": true,
    "commonDifference": null,
    "commonRatio": null,
    "trend": "Fluctuating",
    "additionalPatterns": ["Symmetric Pattern"]
  }
}
```

#### Advanced Analysis
- **URL**: `/api/PatternAnalysis/advanced-analysis`
- **Method**: POST
- **Body**: Same as above
- **Response**: Advanced pattern analysis only

## Project Structure

```
PatternSense.Analytics/
├── Controllers/
│   └── PatternAnalysisController.cs
├── Models/
│   ├── PatternAnalysisRequest.cs
│   └── PatternAnalysisResponse.cs
├── Services/
│   └── AdvancedPatternAnalysisService.cs
├── Extensions/
│   └── ServiceCollectionExtensions.cs
├── Program.cs
├── appsettings.json
└── README.md
```

## Integration with Java Backend

This .NET Core application integrates with the Java Spring Boot backend by:

1. Calling the Java API for basic pattern analysis (hill, valley, plain)
2. Enhancing the results with advanced pattern detection
3. Combining both results into a comprehensive response

## Future Enhancements

- Machine learning-based pattern prediction
- Database integration for pattern history
- User authentication and authorization
- Pattern visualization
- PDF report generation 