CREATE TABLE course (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    description TEXT NOT NULL,
    title VARCHAR(255) NOT NULL,
    category ENUM('Beginner', 'Intermediate', 'Professional') NOT NULL,
    instructor_name VARCHAR(255) NOT NULL,
    rating DECIMAL(2,1) NOT NULL,
    duration FLOAT NOT NULL,
    content VARCHAR(255) NOT NULL,
    img_url TEXT NOT NULL
);
