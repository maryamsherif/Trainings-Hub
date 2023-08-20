package com.example.trainingHub.model;

import jakarta.persistence.*;

import java.util.List;


@Entity
public class Course {

    public Course() {
        calculateAndSetAverageRating();
    }
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String description;
    private String category;
    private String instructorName;
    private double rating;
    private String duration;
    private String content;

    @OneToMany(mappedBy = "course", cascade = CascadeType.ALL)
    private List<Comment> comments;

    public List<Comment> getComments() {
        return comments;
    }
    public int getId() {
        return id;
    }

    public String getDescription() {
        return description;
    }

    public String getCategory() {
        return category;
    }

    public String getInstructorName() {
        return instructorName;
    }

    public double getRating() {
        return rating;
    }

    public String getDuration() {
        return duration;
    }

    public String getContent() {
        return content;
    }

        private void calculateAndSetAverageRating() {
        List<Comment> comments = this.getComments();
        System.out.println(comments);
        double finalRatingsAvg = 0.0;
        if (comments == null || comments.isEmpty()) {
            setRating(finalRatingsAvg);
            return;
        }

        int totalRating = 0;
        for (Comment comment : comments)
            totalRating += comment.getRating();


        finalRatingsAvg = (double) totalRating / comments.size();
        setRating(finalRatingsAvg);
    }

    public void setRating(double _rating) {
        this.rating = _rating;
    }


    // Getters and setters
}
