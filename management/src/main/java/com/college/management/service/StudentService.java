package com.college.management.service;

import com.college.management.model.Student;
import com.college.management.repository.StudentRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StudentService {

    private final StudentRepository repo;

    public StudentService(StudentRepository repo) {
        this.repo = repo;
    }

    public Student create(Student student) {
        // optionally check duplicates
        repo.findByEmail(student.getEmail()).ifPresent(s -> {
            throw new IllegalArgumentException("Email already exists");
        });
        return repo.save(student);
    }

    public Student update(Long id, Student input) {
        Student s = repo.findById(id).orElseThrow(() -> new RuntimeException("Student not found"));
        s.setFirstName(input.getFirstName());
        s.setLastName(input.getLastName());
        s.setEmail(input.getEmail());
        s.setPhone(input.getPhone());
        s.setDepartment(input.getDepartment());
        return repo.save(s);
    }

    public List<Student> getAll() {
        return repo.findAll();
    }

    public Student getById(Long id) {
        return repo.findById(id).orElseThrow(() -> new RuntimeException("Student not found"));
    }

    public void delete(Long id) {
        repo.deleteById(id);
    }
}
