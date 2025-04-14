package com.patternsense.service;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.Map;
import java.util.stream.Collectors;

@Slf4j
@Service
public class PatternAnalysisService {

    public enum PatternType {
        HILL, VALLEY, PLAIN, NONE
    }

    public PatternType analyzePattern(int[] numbers) {
        if (numbers == null || numbers.length != 5) {
            throw new IllegalArgumentException("Input must be an array of exactly 5 numbers");
        }

        if (isPlain(numbers)) {
            return PatternType.PLAIN;
        } else if (isValley(numbers) && isHill(numbers)) {
            return PatternType.NONE;
        } else if (isValley(numbers)) {
            return PatternType.VALLEY;
        } else if (isHill(numbers)) {
            return PatternType.HILL;
        }
        return PatternType.NONE;
    }

    private boolean isHill(int[] numbers) {
        return (numbers[0] < numbers[1] && numbers[1] > numbers[2]) ||
               (numbers[1] < numbers[2] && numbers[2] > numbers[3]) ||
               (numbers[2] < numbers[3] && numbers[3] > numbers[4]);
    }

    private boolean isValley(int[] numbers) {
        return (numbers[0] > numbers[1] && numbers[1] < numbers[2]) ||
               (numbers[1] > numbers[2] && numbers[2] < numbers[3]) ||
               (numbers[2] > numbers[3] && numbers[3] < numbers[4]);
    }

    private boolean isPlain(int[] numbers) {
        return Arrays.stream(numbers)
                .allMatch(num -> num == numbers[0]);
    }

    public int countDuplicates(int[] numbers) {
        Map<Integer, Long> frequencyMap = Arrays.stream(numbers)
                .boxed()
                .collect(Collectors.groupingBy(
                    num -> num,
                    Collectors.counting()
                ));

        return frequencyMap.values().stream()
                .filter(count -> count > 1)
                .mapToInt(Long::intValue)
                .sum();
    }

    public String getPatternDescription(int[] numbers) {
        PatternType patternType = analyzePattern(numbers);
        int duplicates = countDuplicates(numbers);
        
        StringBuilder description = new StringBuilder();
        description.append("Pattern: ").append(patternType);
        
        if (duplicates > 0) {
            description.append(", Duplicates: ").append(duplicates);
        } else {
            description.append(", No duplicates found");
        }
        
        return description.toString();
    }
} 