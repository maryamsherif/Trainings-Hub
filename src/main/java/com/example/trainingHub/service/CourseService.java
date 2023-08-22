package com.example.trainingHub.service;

import com.example.trainingHub.model.Course;
import com.example.trainingHub.repository.CourseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import com.example.trainingHub.model.Comment;

@Service
public class CourseService {

    @Autowired
    private CourseRepository courseRepository; // Assuming you have a CourseRepository interface

    public List<Course> getAllCourses(Integer page, Integer size){

        Pageable paging = PageRequest.of(page, size);
        return courseRepository.findAll(paging).getContent();
    }

    //getCourseById method
    public Course getCourseById(int courseId) {
        Optional<Course> optionalCourse = courseRepository.findById(courseId);
        return optionalCourse.orElse(null); // Return null if course is not found
    }

    //addCourse method
    public Course addCourse(Course course) {
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

    public List<Comment> getAllCourseComment(Integer courseId, Integer page, Integer size ){
        Pageable paging = PageRequest.of(page, size);
        return courseRepository.findAllCommentsById(courseId, paging);
    }

    public List<Course> searchCoursesByKeyword(String keyword, Integer page, Integer size) {
        Pageable paging = PageRequest.of(page, size);
        return courseRepository.searchCoursesByKeyword(keyword.toLowerCase(), paging);
    }

    // Other methods for CRUD operations or business logic
}
