CREATE TABLE course (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    description VARCHAR(255) NOT NULL,
    category ENUM('Beginner', 'Intermediate', 'Professional') NOT NULL,
    instructor_name VARCHAR(255) NOT NULL,
    rating DOUBLE NOT NULL,
    duration FLOAT NOT NULL,
    content VARCHAR(255) NOT NULL
);
