package com.example.trainingHub.service;

import com.example.trainingHub.model.Course;
import com.example.trainingHub.repository.CourseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class CourseService {

    @Autowired
    private CourseRepository courseRepository; // Assuming you have a CourseRepository interface

    //getCourseById method
    public Course getCourseById(Long courseId) {
        Optional<Course> optionalCourse = courseRepository.findById(courseId);
        return optionalCourse.orElse(null); // Return null if course is not found
    }

    //addCourse method
    public Course addCourse(Course course) {
        return courseRepository.save(course);
    }

    //updateCourse method
    public Course updateCourse(Long courseId, Course course) {
        Optional<Course> optionalCourse = courseRepository.findById(courseId);
        if (optionalCourse.isPresent()) {
            Course existingCourse = optionalCourse.get();
            existingCourse.setDescription(course.getDescription());
            existingCourse.setCategory(course.getCategory());
            existingCourse.setInstructorName(course.getInstructorName());
            existingCourse.setDuration(course.getDuration());
            existingCourse.setContent(course.getContent());
            return courseRepository.save(existingCourse);
        } else {
            return null;
        }
    }
    // Other methods for CRUD operations or business logic
}
