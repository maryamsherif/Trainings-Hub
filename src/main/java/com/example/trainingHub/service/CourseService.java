package com.example.trainingHub.service;

import com.example.trainingHub.dto.commentdto;
import com.example.trainingHub.model.Comment;
import com.example.trainingHub.model.Course;
import com.example.trainingHub.repository.CommentRepository;
import com.example.trainingHub.repository.CourseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class CourseService {

    @Autowired
    private CourseRepository courseRepository; // Assuming you have a CourseRepository interface
    @Autowired
    private CommentRepository commentRepository;

    public List<Course> getAllCourses(){
        return courseRepository.findAll();
    }

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
    public boolean createComment(commentdto commentDTO, Integer courseId) {

        Comment comment = new Comment();
        comment.setId(commentDTO.getId());
        comment.setCourse_id(courseId);
        comment.setComment_date_time(LocalDateTime.now());
        comment.setRating(commentDTO.getRating());
        comment.setAuthor(commentDTO.getAuthor());
        comment.setComment(commentDTO.getComment());

        try
        {
            commentRepository.save(comment);
        }
        catch (Exception e) {
            return false;
        }
        return true;
    }
}
