package com.patternsense.controller;

import com.patternsense.service.PatternAnalysisService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/patterns")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class PatternAnalysisController {

    private final PatternAnalysisService patternAnalysisService;

    @PostMapping("/analyze")
    public ResponseEntity<Map<String, Object>> analyzePattern(@RequestBody int[] numbers) {
        try {
            PatternAnalysisService.PatternType patternType = patternAnalysisService.analyzePattern(numbers);
            int duplicates = patternAnalysisService.countDuplicates(numbers);
            
            return ResponseEntity.ok(Map.of(
                "patternType", patternType,
                "duplicates", duplicates,
                "description", patternAnalysisService.getPatternDescription(numbers)
            ));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }
} 