package Services;

import com.example.trainingHub.model.Course;
import com.example.trainingHub.repository.CourseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
    public class CourseService {
        @Autowired
        private CourseRepository courseRepository;

        public void updateAverageRatingForCourse(Long courseId) {
            Double averageRating = courseRepository.calculateAverageRatingByCourseId(courseId);
            Course course = courseRepository.findById(courseId).orElse(null);

            if (course != null) {
                course.setRating(averageRating != null ? averageRating : 0.0);
                courseRepository.save(course);
            }
        }
    }
