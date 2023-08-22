package com.example.trainingHub.repository;


import com.example.trainingHub.model.Course;
import com.example.trainingHub.model.Comment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface CourseRepository extends JpaRepository<Course, Integer> {
    List<Course> findAllByCategory(String category);
    @Query("SELECT c FROM Comment c WHERE c.course.id = :courseId")
    List<Comment> findAllCommentsById(@Param("courseId") Integer courseId);
    @Query("SELECT AVG(c.rating) FROM Comment c WHERE c.course.id = :courseId")
    Double calculateAverageRatingByCourseId(Long courseId);

    @Query("SELECT c FROM Course c WHERE " +
            "LOWER(c.description) LIKE %:keyword% OR " +
            "LOWER(c.category) LIKE %:keyword% OR " +
            "LOWER(c.instructorName) LIKE %:keyword%")
    List<Course> searchCoursesByKeyword(@Param("keyword") String keyword);
}