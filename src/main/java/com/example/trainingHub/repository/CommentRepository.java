package com.example.trainingHub.repository;

import com.example.trainingHub.model.Comment;
import com.example.trainingHub.model.Course;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CommentRepository extends JpaRepository<Comment, Long> {
}
