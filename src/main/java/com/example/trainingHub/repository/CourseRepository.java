package com.example.trainingHub.repository;


import com.example.trainingHub.model.Course;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface CourseRepository extends JpaRepository<Course, Long> {
    List<Course> findAllByCategory(String category);

    @Query("SELECT AVG(c.rating) FROM Comment c WHERE c.course.id = :courseId")
    Double calculateAverageRatingByCourseId(Long courseId);
}