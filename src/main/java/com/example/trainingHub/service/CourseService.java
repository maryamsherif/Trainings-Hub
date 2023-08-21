package com.example.trainingHub.service;

import com.example.trainingHub.model.Course;
import com.example.trainingHub.repository.CourseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import com.example.trainingHub.model.Comment;

@Service
public class CourseService {

    @Autowired
    private CourseRepository courseRepository; // Assuming you have a CourseRepository interface

    public List<Course> getAllCourses(){
        return courseRepository.findAll();
    }

    //getCourseById method
    public Course getCourseById(int courseId) {
        Optional<Course> optionalCourse = courseRepository.findById(courseId);
        return optionalCourse.orElse(null); // Return null if course is not found
    }

    //addCourse method
    public Course addCourse(Course course) {
        int courseId = course.getId();

        if (courseId != 0 && courseRepository.findById(courseId).isPresent()) {
            throw new IllegalArgumentException("Course with ID " + courseId + " already exists.");
        }
        try {
            return courseRepository.save(course);
        } catch (Exception e) {
            // Handle the exception here
            throw new RuntimeException("Error adding course: Required fields are missing.");
        }
    }

    //updateCourse method
    public Course updateCourse(int courseId, Course course) {
        try {
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
                throw new IllegalArgumentException("Course with ID " + courseId + " does not exist.");
            }
        } catch (Exception e) {
            // Handle the exception here
            throw new RuntimeException("Error updating course: " + e.getMessage());
        }
    }

    public List<Comment> getAllCourseComment(Integer courseId){
        return courseRepository.findAllCommentsById(courseId);
    }

    public List<Course> searchCoursesByKeyword(String keyword) {
        return courseRepository.searchCoursesByKeyword(keyword.toLowerCase());
    }

    // Other methods for CRUD operations or business logic
}
