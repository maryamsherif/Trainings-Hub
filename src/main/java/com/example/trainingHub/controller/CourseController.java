package com.example.trainingHub.controller;

import com.example.trainingHub.model.Comment;
import com.example.trainingHub.model.Course;
import com.example.trainingHub.repository.CourseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.ErrorResponse;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@RestController
@RequestMapping("/api")
public class CourseController {

    @Autowired
    private CourseRepository courseRepository;


    @GetMapping("/getCourseById/{courseId}") // Map to the URL from your OpenAPI definition
    public ResponseEntity<Course> getCourseById(@PathVariable Long courseId) {
        Course course = courseRepository.findById(courseId).orElse(null);
        if (course != null) {
            return ResponseEntity.ok(course);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    public enum CourseCategory {
        beginner,
        intermediate,
        professional
    }

    @GetMapping("/getCoursesByCategory/{category}")
    public ResponseEntity<?> getCourseByCategory(@PathVariable String category) {
        // Validate input category against the enum values
        try {
            CourseCategory.valueOf(category.toLowerCase()); // Convert to uppercase for case-insensitivity
        } catch (IllegalArgumentException e) {
                CourseCategory[] categories = CourseCategory.values();

                String joinedCategories = String.join(", ",
                        Stream.of(categories)
                                .map(Enum::name)
                                .collect(Collectors.toList()));
            String errorMessage = "Invalid category: " + category.toLowerCase() + ", the appropriate values are " + joinedCategories;
            CustomErrorResponse errorResponse = new CustomErrorResponse(errorMessage);
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorResponse);

        }

        List<Course> courses = courseRepository.findAllByCategory(category);
        if (!courses.isEmpty()) {
            return ResponseEntity.ok(courses);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/deleteCourse/{courseId}")
    public ResponseEntity<?> deleteCourse(@PathVariable Long courseId) {
        // Check if the course exists (you need to implement this part)
        boolean courseExists = courseRepository.existsById(courseId);

        if (courseExists) {
            courseRepository.deleteById(courseId);
            String successMessage = "Course with ID " + courseId + " has been deleted.";
            return ResponseEntity.ok(successMessage);
        } else {
            String errorMessage = "Course with ID " + courseId + " not found.";
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new CustomErrorResponse(errorMessage));
        }
    }

}

