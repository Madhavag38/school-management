CREATE DATABASE IF NOT EXISTS school_management;
USE school_management;
CREATE TABLE IF NOT EXISTS schools (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    address VARCHAR(500) NOT NULL,
    latitude DECIMAL(10, 8) NOT NULL,
    longitude DECIMAL(11, 8) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_coordinates (latitude, longitude),
    INDEX idx_created_at (created_at)
);
INSERT INTO schools (name, address, latitude, longitude) VALUES
('ABC School', 'Delhi', 28.7041, 77.1025),
('XYZ School', 'Mumbai', 19.0760, 72.8777),
('Modern Public School', 'Chandigarh', 30.7333, 76.7794);
