package com.example.trainingHub.controller;

import com.example.trainingHub.dto.commentdto;
import com.example.trainingHub.model.Comment;
import com.example.trainingHub.repository.CommentRepository;
import com.example.trainingHub.service.CommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/comment")
public class CommentController {
    @Autowired
    private CommentRepository commentRepository;
    @Autowired
    private CommentService commentService;

    @DeleteMapping("/deleteComment/{commentId}")
    public ResponseEntity<String> deleteComment(@PathVariable Long commentId) {
        Optional<Comment> optionalComment = commentRepository.findById(commentId);

        if (optionalComment.isPresent()) {
            Comment comment = optionalComment.get();
            commentRepository.delete(comment);
            return ResponseEntity.ok("Comment deleted successfully");
        } else {
            String errorMessage = "Comment with ID " + commentId + " not found";
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(errorMessage);
        }
    }

    @PostMapping("/addComment/{courseId}")
    public ResponseEntity<String> addComment(@PathVariable Integer courseId, @RequestBody commentdto commentdto) {
        Boolean comment = commentService.createComment(commentdto, courseId);
        if (comment) {
            return ResponseEntity.ok("Comment added successfully !");
        } else {
            return ResponseEntity.badRequest().body("Invalid Input");
        }
    }
}