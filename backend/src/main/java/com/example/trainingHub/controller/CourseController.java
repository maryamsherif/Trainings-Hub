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
@RequestMapping("/api/course")
public class CourseController {

    @Autowired
    private CourseRepository courseRepository;

    @Autowired
    private CourseService courseService;

    @GetMapping("/getAllCourses")
    public ResponseEntity<List<Course>> getAllCourses(){
        List<Course> courses = courseService.getAllCourses();
        return ResponseEntity.status(HttpStatus.OK).body(courses);
    }

    @GetMapping("/getCourseById/{courseId}")
    public ResponseEntity<?> getCourseById(@PathVariable int courseId) {
        Course course = courseService.getCourseById(courseId);
        if (course != null) {
            return ResponseEntity.ok(course);
        } else {
            return ResponseEntity.badRequest().body(new CustomErrorResponse("Course with ID " + courseId + " not found."));
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
        try {
            Course addedCourse = courseService.addCourse(course);
            return ResponseEntity.status(HttpStatus.CREATED).body(addedCourse);
        } catch (RuntimeException e) {
            CustomErrorResponse errorMsg=new CustomErrorResponse(e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorMsg);
        }
    }

    @PatchMapping("/updateCourse/{courseId}")
    public ResponseEntity<?> updateCourse(@PathVariable int courseId, @RequestBody Course course) {
        if (courseService.getCourseById(courseId)!=null) {
            if (course.getDescription() == null || course.getCategory() == null || course.getInstructorName() == null) {
                return ResponseEntity.badRequest().body(new CustomErrorResponse("Required fields are missing."));
            }

            if (course.getContent() == null) {
                return ResponseEntity.badRequest().body(new CustomErrorResponse("Content is missing."));
            }

            Course updatedCourse = courseService.updateCourse(courseId, course);
            return ResponseEntity.ok(updatedCourse);
        } else {
            return ResponseEntity.badRequest().body(new CustomErrorResponse("Course with ID " + courseId + " not found."));
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
            return ResponseEntity.badRequest().body(new CustomErrorResponse("Course with ID " + courseId + " not found."));
        }
    }

    @GetMapping("/getAllCoursesByKeyword")
    public ResponseEntity<?> searchCoursesByKeyword(@RequestParam String keyword) {
        List<Course> courses = courseService.searchCoursesByKeyword(keyword);

        if (!courses.isEmpty()) {
            return ResponseEntity.ok(courses);
        } else {
            return ResponseEntity.badRequest().body(new CustomErrorResponse("No courses found."));
        }
    }


}
