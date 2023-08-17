package com.example.trainingHub.controller;

import com.example.trainingHub.model.Course;
import com.example.trainingHub.repository.CourseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
}
