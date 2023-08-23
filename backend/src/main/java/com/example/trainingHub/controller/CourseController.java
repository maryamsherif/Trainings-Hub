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
import com.example.trainingHub.controller.CustomResponse;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import java.util.stream.Stream;
import com.example.trainingHub.controller.CustomResponse;



@RestController
@RequestMapping("/api/course")
public class CourseController {

    @Autowired
    private CourseRepository courseRepository;

    @Autowired
    private CourseService courseService;

    @GetMapping("/getAllCourses")
    public ResponseEntity<Object> getAllCourses(){
        List<Course> courses = courseService.getAllCourses();
        return ResponseEntity.status(HttpStatus.OK).body(new CustomResponse("Success", "200", courses));
    }

    @GetMapping("/getCourseById/{courseId}")
    public ResponseEntity<?> getCourseById(@PathVariable int courseId) {
        Course course = courseService.getCourseById(courseId);
        if (course != null) {
            return ResponseEntity.ok(new CustomResponse("Success", "200", course));
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new CustomResponse("Course with ID " + courseId + " not found.", "404", new ArrayList<>()));
        }
    }

    public enum CourseCategory {
        beginner,
        intermediate,
        professional
    }

    @GetMapping("/getCoursesByCategory/{category}")
    public ResponseEntity<Object> getCourseByCategory(@PathVariable String category) {
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
            CustomResponse errorResponse = new CustomResponse(errorMessage, "400", new ArrayList<>());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorResponse);

        }

        List<Course> courses = courseRepository.findAllByCategory(category);
        if (!courses.isEmpty()) {
            return ResponseEntity.ok(new CustomResponse("Success", "200", courses));
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new CustomResponse("Category Not Found !", "404", new ArrayList<>()));
        }
    }

    @PostMapping("/addCourse")
    public ResponseEntity<?> addCourse(@RequestBody Course course) {
        try {
            Course addedCourse = courseService.addCourse(course);
            return ResponseEntity.status(HttpStatus.CREATED).body(new CustomResponse("Success", "201", addedCourse));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(new CustomResponse(e.getMessage(), "400", new ArrayList<>()));
        }
    }

    @PatchMapping("/updateCourse/{courseId}")
    public ResponseEntity<?> updateCourse(@PathVariable int courseId, @RequestBody Course course) {
        if ( courseService.getCourseById(courseId) !=null ) {
            if (course.getDescription() == null || course.getCategory() == null || course.getInstructorName() == null) {
                return ResponseEntity.badRequest().body(new CustomResponse("Fields must not be null", "400", new ArrayList<>()));
            }

            if (course.getContent() == null) {
                return ResponseEntity.badRequest().body(new CustomResponse("Content must not be null", "400", new ArrayList<>()));

            }

            Course updatedCourse = courseService.updateCourse(courseId, course);
            return ResponseEntity.status(HttpStatus.CREATED).body(new CustomResponse("Success", "201", updatedCourse));
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new CustomResponse("Course with ID " + courseId + " not found.", "404", new ArrayList<>()));
        }
        }


    @DeleteMapping("/deleteCourse/{courseId}")
    public ResponseEntity<?> deleteCourse(@PathVariable int courseId) {
        // Check if the course exists (you need to implement this part)
        boolean courseExists = courseRepository.existsById(courseId);

        if (courseExists) {
            courseRepository.deleteById(courseId);
            String successMessage = "Course with ID " + courseId + " has been deleted.";
            return ResponseEntity.ok(new CustomResponse("Success", "200", new ArrayList<>()));
        } else {
            String errorMessage = "Course with ID " + courseId + " not found.";
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new CustomResponse(errorMessage, "404", new ArrayList<>()));
        }
    }

    @GetMapping("/getAllCourseComments/{courseId}")
    public ResponseEntity <?> getAllCourseComments(@PathVariable int courseId) {
        List<Comment> comment = courseService.getAllCourseComment(courseId);
        if (comment != null) {
            return ResponseEntity.ok(new CustomResponse("Success", "200", comment));
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new CustomResponse("Cannot find comments for course with ID " + courseId + ".", "404", new ArrayList<>()));
        }
    }

    @GetMapping("/getAllCoursesByKeyword")
    public ResponseEntity<?> searchCoursesByKeyword(@RequestParam String keyword) {
        List<Course> courses = courseService.searchCoursesByKeyword(keyword);

        if (!courses.isEmpty()) {
        return ResponseEntity.ok(new CustomResponse("Success", "200", courses));
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new CustomResponse("No courses found with keyword " + keyword, "404", courses));

        }
    }

    @PostMapping("/bulkInsertPath")
    public ResponseEntity<?> bulkInsertByPath(@RequestParam String csvPath) {
        try {
            courseService.bulkUploadFromCsv(csvPath);
            return ResponseEntity.status(HttpStatus.CREATED).body(new CustomResponse("Success", "201", new ArrayList<>()));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(new CustomResponse(e.getMessage(), "400", new ArrayList<>()));
        }
    }

    @PostMapping("/bulkInsertCSV")
    public ResponseEntity<?>  bulkInsertCSV(@RequestParam("file") MultipartFile file) {
        if (!file.isEmpty()) {
            try {
                courseService.bulkInsertFromCsv(file.getInputStream());
                return ResponseEntity.status(HttpStatus.CREATED).body(new CustomResponse("Success", "201", new ArrayList<>()));
            }
            catch (IOException e)
            {
                return ResponseEntity.badRequest().body(new CustomResponse(e.getMessage(), "400", new ArrayList<>()));
            }
        }
        else
        {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new CustomResponse("File not found", "404", new ArrayList<>()));

        }

    }



}

