package com.example.trainingHub.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class commentdto {
        private Integer id;
        private String author;
        private int rating;
        private String comment;
}
