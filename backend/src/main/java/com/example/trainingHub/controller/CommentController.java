package com.example.trainingHub.controller;

import com.example.trainingHub.dto.commentdto;
import com.example.trainingHub.model.Comment;
import com.example.trainingHub.model.Course;
import com.example.trainingHub.repository.CommentRepository;
import com.example.trainingHub.repository.CourseRepository;
import com.example.trainingHub.service.CommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;


@RestController
@RequestMapping("/api/comment")
public class CommentController {
    @Autowired
    private CommentService commentService;

    @DeleteMapping("/deleteComment/{commentId}")
    public ResponseEntity<Object> deleteComment(@PathVariable Integer commentId) {
        Boolean response = commentService.deleteComment(commentId);

        if (response) {

            return ResponseEntity.ok(new CustomResponse("Success", "200", new ArrayList<>()));
        }
        else
        {
            String errorMessage = "Comment with ID " + commentId + " not found";
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new CustomResponse(errorMessage, "404",  new ArrayList<>()));
        }
    }

    @PostMapping("/addComment/{courseId}")
    public ResponseEntity<Object> addComment(@PathVariable Integer courseId, @RequestBody commentdto commentdto) {
        Boolean comment = commentService.createComment(commentdto, courseId);
        if (comment) {
            return ResponseEntity.ok(new CustomResponse("Success", "201",  new ArrayList<>()));
        } else {
            return ResponseEntity.badRequest().body(new CustomResponse("Invalid Input", "400",  new ArrayList<>()));
        }
    }
}