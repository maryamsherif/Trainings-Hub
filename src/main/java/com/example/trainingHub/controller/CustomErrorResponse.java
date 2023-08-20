package com.example.trainingHub.controller;

import org.springframework.http.HttpStatus;

public class CustomErrorResponse {
    private String status;
    private String message;

    public CustomErrorResponse(String message) {
        this.status = "error";
        this.message = message;
    }

    public String getStatus() {
        return status;
    }

    public String getMessage() {
        return message;
    }
}