package com.example.trainingHub.controller;

import com.example.trainingHub.model.Course;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CustomResponse {
    private String message;
    private String status;
    private Object response ;

}
