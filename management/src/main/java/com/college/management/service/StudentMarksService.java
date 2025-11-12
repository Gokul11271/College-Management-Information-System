package com.college.management.service;

import com.college.management.model.StudentMarks;
import com.college.management.repository.StudentMarksRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StudentMarksService {

    private final StudentMarksRepository repo;

    public StudentMarksService(StudentMarksRepository repo) {
        this.repo = repo;
    }

    public StudentMarks save(StudentMarks m) {
        if (m == null) {
            throw new IllegalArgumentException("StudentMarks cannot be null");
        }
        return repo.save(m);
    }

    public List<StudentMarks> getByStudent(Long studentId) {
        return repo.findByStudentId(studentId);
    }

    public List<StudentMarks> getByCourse(Long courseId) {
        return repo.findByCourseId(courseId);
    }

    public List<StudentMarks> getAll() {
        return repo.findAll();
    }

    public void delete(Long id) {
        if (id == null) {
            throw new IllegalArgumentException("Id cannot be null");
        }
        repo.deleteById(id);
    }
}
