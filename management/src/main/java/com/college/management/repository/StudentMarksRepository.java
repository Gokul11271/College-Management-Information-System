package com.college.management.repository;

import com.college.management.model.StudentMarks;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface StudentMarksRepository extends JpaRepository<StudentMarks, Long> {
    List<StudentMarks> findByStudentId(Long studentId);
    List<StudentMarks> findByCourseId(Long courseId);
    List<StudentMarks> findByStudentNameContainingIgnoreCase(String name);
}
