package com.example.trainingHub.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
public class Comment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String author;

    private String comment;
    private int rating;
    private LocalDateTime commentDateTime;
    @ManyToOne
    @JoinColumn(name = "course_id")
    private Course course;

    public int getRating() {
        return rating;
    }

    public String getAuthor() {
        return author;
    }

    public String getComment() {
        return comment;
    }

    public int getId() {
        return id;
    }

    public LocalDateTime getCommentDateTime(){
        return commentDateTime;
    }

}
