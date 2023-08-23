package com.example.trainingHub.service;

import com.example.trainingHub.model.Course;
import com.example.trainingHub.repository.CourseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.jdbc.core.BatchPreparedStatementSetter;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import java.io.*;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import com.example.trainingHub.model.Comment;

@Service
public class CourseService {

    @Autowired
    private CourseRepository courseRepository; // Assuming you have a CourseRepository interface
    @Autowired
    private JdbcTemplate jdbcTemplate;

    public List<Course> getAllCourses(Integer page, Integer size){

        Pageable paging = PageRequest.of(page, size);
        return courseRepository.findAll(paging).getContent();
    }

    //getCourseById method
    public Course getCourseById(int courseId) {
        Optional<Course> optionalCourse = courseRepository.findById(courseId);
        return optionalCourse.orElse(null); // Return null if course is not found
    }

    //addCourse method
    public Course addCourse(Course course) {
        try {
            return courseRepository.save(course);
        } catch (Exception e) {
            // Handle the exception here
            throw new RuntimeException("Error adding course: Required fields are missing.");
        }
    }

    //updateCourse method
    public Course updateCourse(int courseId, Course course) {
        try {
            Optional<Course> optionalCourse = courseRepository.findById(courseId);
            if (optionalCourse.isPresent()) {
                Course existingCourse = optionalCourse.get();
                existingCourse.setDescription(course.getDescription());
                existingCourse.setCategory(course.getCategory());
                existingCourse.setInstructorName(course.getInstructorName());
                existingCourse.setDuration(course.getDuration());
                existingCourse.setContent(course.getContent());
                return courseRepository.save(existingCourse);
            } else {
                throw new IllegalArgumentException("Course with ID " + courseId + " does not exist.");
            }
        } catch (Exception e) {
            // Handle the exception here
            throw new RuntimeException("Error updating course: " + e.getMessage());
        }
    }

    public List<Comment> getAllCourseComment(Integer courseId, Integer page, Integer size ){
        Pageable paging = PageRequest.of(page, size);
        return courseRepository.findAllCommentsById(courseId, paging);
    }

    public List<Course> searchCoursesByKeyword(String keyword, Integer page, Integer size) {
        Pageable paging = PageRequest.of(page, size);
        return courseRepository.searchCoursesByKeyword(keyword.toLowerCase(), paging);
    }

    public void bulkUploadFromCsv(String csvFilePath) {

        List<Course> courses = new ArrayList<>();

        try (BufferedReader reader = new BufferedReader(new FileReader(csvFilePath))) {

            String line;
            reader.readLine();

            while ((line = reader.readLine()) != null) {

                String[] fields = line.split(",");
                Course course = new Course();
                course.setId(Integer.parseInt(fields[0]));
                course.setContent(fields[1]);
                course.setDuration(fields[2]);
                course.setInstructorName(fields[3]);
                course.setDescription(fields[4]);
                course.setCategory(fields[5]);
                course.setRating(Double.parseDouble(fields[6]));
                courses.add(course);

            }

            String sql = "INSERT INTO COURSE (id, content, duration, instructor_name, description, category, rating) " +
                    "VALUES (?, ?, ?, ?, ?, ?, ?)";

            jdbcTemplate.batchUpdate(sql, new BatchPreparedStatementSetter() {
                @Override
                public void setValues(PreparedStatement ps, int i) throws SQLException {
                    Course course = courses.get(i);
                    ps.setInt(1, course.getId());
                    ps.setString(2, course.getContent());
                    ps.setString(3, course.getDuration());
                    ps.setString(4, course.getInstructorName());
                    ps.setString(5, course.getDescription());
                    ps.setString(6, course.getCategory());
                    ps.setDouble(7, course.getRating());
                }

                @Override
                public int getBatchSize() {
                    return courses.size();
                }
            });

        } catch (FileNotFoundException e) {
            throw new RuntimeException(e);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    public void bulkInsertFromCsv(InputStream inputStream) {

        List<Course> courses = parseDataFromCSVFile(inputStream);

        String sql = "INSERT INTO COURSE (id, content, duration, instructor_name, description, category, rating) " +
                "VALUES (?, ?, ?, ?, ?, ?, ?)";

        jdbcTemplate.batchUpdate(sql, new BatchPreparedStatementSetter() {
            @Override
            public void setValues(PreparedStatement ps, int i) throws SQLException {
                Course course = courses.get(i);
                ps.setInt(1, course.getId());
                ps.setString(2, course.getContent());
                ps.setString(3, course.getDuration());
                ps.setString(4, course.getInstructorName());
                ps.setString(5, course.getDescription());
                ps.setString(6, course.getCategory());
                ps.setDouble(7, course.getRating());
            }

            @Override
            public int getBatchSize() {
                return courses.size();
            }
        });

    }

    private List<Course> parseDataFromCSVFile(InputStream csvInputStream) {
        List<Course> courses = new ArrayList<>();

        try (BufferedReader reader = new BufferedReader(new InputStreamReader(csvInputStream))) {
            String line;
            reader.readLine();
            while ((line = reader.readLine()) != null) {
                System.out.println(line);
                String[] fields = line.split(",");
                Course course = new Course();
                course.setId(Integer.parseInt(fields[0]));
                course.setContent(fields[1]);
                course.setDuration(fields[2]);
                course.setInstructorName(fields[3]);
                course.setDescription(fields[4]);
                course.setCategory(fields[5]);
                course.setRating(Double.parseDouble(fields[6]));
                courses.add(course);
            }
        } catch (IOException e) {
            e.printStackTrace();
        }

        return courses;
    }

}
