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
public class CommentService {

    @Autowired
    private CommentRepository commentRepository ;
    @Autowired
    private CourseRepository courseRepository ;



    public boolean createComment(commentdto commentDTO, Integer courseId) {

        // check if the course exists
        Course course = courseRepository.findById(courseId).orElse(null);

        if (course != null) {

            Comment comment = new Comment();
            comment.setId(commentDTO.getId());
            comment.setComment_date_time(LocalDateTime.now());
            comment.setRating(commentDTO.getRating());
            comment.setAuthor(commentDTO.getAuthor());
            comment.setComment(commentDTO.getComment());
            comment.setCourse(course);

            try
            {
                commentRepository.save(comment);
            }
            catch (Exception e) {
                return false;
            }

            course.setRating(getAverageRating(course.getComments(), commentDTO.getRating()));

            try
            {
                courseRepository.save(course);
            }
            catch (Exception e) {
                return false;
            }

            return true ;

        }

        return false;
    }

    private Double getAverageRating(List<Comment> comments, Integer newComment )
    {
        Double average = 0.0 ;

        for (Comment comment: comments) {

            average+= comment.getRating();

        }

        System.out.println(average);
        System.out.println(comments.size());
        System.out.println(average/(comments.size()+0.0));

        return average/(comments.size()+0.0) ;

    }
}
