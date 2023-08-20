package com.example.trainingHub.controller;

import com.example.trainingHub.model.Comment;
import com.example.trainingHub.model.Course;
import com.example.trainingHub.repository.CourseRepository;
import com.example.trainingHub.service.CourseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.ErrorResponse;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;


@RestController
public class CourseController {

    @Autowired
    private CourseRepository courseRepository;

    @Autowired
    private CourseService courseService;

    @GetMapping("/getCourseById/{courseId}")
    public ResponseEntity<?> getCourseById(@PathVariable int courseId) {
        Course course = courseService.getCourseById(courseId);
        if (course != null) {
            return ResponseEntity.ok(course);
        } else {
            return ResponseEntity.badRequest().body("Course with ID " + courseId + " not found.");
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
    @PostMapping("/addCourse")
    public ResponseEntity<?> addCourse(@RequestBody Course course) {
        Course addedCourse = courseService.addCourse(course);
        if (addedCourse != null) {
            return ResponseEntity.status(HttpStatus.CREATED).body(addedCourse);
        } else {
            return ResponseEntity.badRequest().body("Fields description, category, instructorName, duration, and content must not be null.");
        }
    }

    @PutMapping("/updateCourse/{courseId}")
    public ResponseEntity<?> updateCourse(@PathVariable int courseId, @RequestBody Course course) {
        if (courseService.getCourseById(courseId)!=null) {
            if (course.getDescription() == null || course.getCategory() == null || course.getInstructorName() == null) {
                return ResponseEntity.badRequest().body("Fields description, category, and instructorName must not be null.");
            }

            if (course.getContent() == null) {
                return ResponseEntity.badRequest().body("Field content must not be null.");
            }

            Course updatedCourse = courseService.updateCourse(courseId, course);
            return ResponseEntity.ok(updatedCourse);
        } else {
            return ResponseEntity.badRequest().body("Course with ID " + courseId + " not found.");
        }
        }


    @DeleteMapping("/deleteCourse/{courseId}")
    public ResponseEntity<?> deleteCourse(@PathVariable int courseId) {
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

    @GetMapping("/getAllCourseComments/{courseId}")
    public ResponseEntity <?> getAllCourseComments(@PathVariable int courseId) {
        List<Comment> comment = courseService.getAllCourseComment(courseId);
        if (comment != null) {
            return ResponseEntity.ok(comment);
        } else {
            return ResponseEntity.badRequest().body("Cannot find comments for course with ID " + courseId + ".");
        }
    }

    @GetMapping("/getAllCoursesByKeyword")
    public ResponseEntity<?> searchCoursesByKeyword(@RequestParam String keyword) {
        List<Course> courses = courseService.searchCoursesByKeyword(keyword);

        if (!courses.isEmpty()) {
            return ResponseEntity.ok(courses);
        } else {
            return ResponseEntity.badRequest().body("No courses found with keyword " + keyword);
        }
    }


}

