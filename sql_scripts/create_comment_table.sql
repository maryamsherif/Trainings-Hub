CREATE TABLE comment (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    course_id INT NOT NULL,
    author VARCHAR(255) NOT NULL,
    rating INT NOT NULL,
    comment TEXT NOT NULL,
    comment_date_time DATETIME NOT NULL,
    FOREIGN KEY (course_id) REFERENCES course(id)
);
