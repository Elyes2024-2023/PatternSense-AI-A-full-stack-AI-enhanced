# PatternSense AI

A modern, AI-enhanced pattern analysis system that detects and analyzes number patterns using advanced Java and .NET Core technologies.

## Features

- Pattern Analysis (Hill, Valley, Plain detection)
- Advanced Pattern Detection (Arithmetic sequences, Geometric sequences, Symmetry)
- Duplicate Number Detection
- Trend Analysis
- RESTful API
- Secure endpoints
- Modern Java 17 features
- Spring Boot 3.x
- .NET Core 7.0 integration
- Cross-Origin Resource Sharing (CORS) support

## Architecture

The system consists of two main components:

1. **Java Spring Boot Backend** - Handles basic pattern detection (hill, valley, plain)
2. **.NET Core Analytics Service** - Provides advanced pattern analysis and integration

## Getting Started

### Prerequisites

- Java 17 or higher
- Maven 3.6 or higher
- .NET 7.0 SDK or higher
- PostgreSQL (optional, for future database integration)

### Building the Java Project

```bash
cd /path/to/java/project
mvn clean install
```

### Running the Java Application

```bash
mvn spring-boot:run
```

The Java application will start on `http://localhost:8080/api`

### Building the .NET Core Project

```bash
cd PatternSense.Analytics
dotnet build
```

### Running the .NET Core Application

```bash
dotnet run
```

The .NET Core application will start on `https://localhost:5001`

## API Endpoints

### Java Spring Boot API

#### Analyze Pattern
- **URL**: `/api/patterns/analyze`
- **Method**: POST
- **Body**: Array of 5 integers
- **Example**:
```json
[1, 2, 3, 2, 1]
```

#### Response Format
```json
{
    "patternType": "HILL",
    "duplicates": 2,
    "description": "Pattern: HILL, Duplicates: 2"
}
```

### .NET Core Analytics API

#### Analyze Pattern with Advanced Analysis
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

## Project Structure

```
PatternSense-AI/
├── src/
│   └── main/
│       └── java/
│           └── com/
│               └── patternsense/
│                   ├── PatternSenseApplication.java
│                   ├── controller/
│                   │   └── PatternAnalysisController.java
│                   ├── service/
│                   │   └── PatternAnalysisService.java
│                   └── config/
│                       └── SecurityConfig.java
├── PatternSense.Analytics/
│   ├── Controllers/
│   │   └── PatternAnalysisController.cs
│   ├── Models/
│   │   ├── PatternAnalysisRequest.cs
│   │   └── PatternAnalysisResponse.cs
│   ├── Services/
│   │   └── AdvancedPatternAnalysisService.cs
│   ├── Extensions/
│   │   └── ServiceCollectionExtensions.cs
│   ├── Program.cs
│   ├── appsettings.json
│   └── README.md
└── README.md
```

## Future Enhancements

- AI-powered pattern prediction
- Database integration for pattern history
- User authentication and authorization
- Pattern visualization
- Mobile app support
- PDF report generation

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Author

Elyes - Original Pattern Analysis Logic 