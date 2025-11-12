package com.college.management.controller;

import com.college.management.model.StudentMarks;
import com.college.management.repository.StudentMarksRepository;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/marks")
@CrossOrigin(origins = "http://localhost:5173")
public class StudentMarksController {

    private final StudentMarksRepository repo;

    public StudentMarksController(StudentMarksRepository repo) {
        this.repo = repo;
    }

    @GetMapping
    public List<StudentMarks> getAllMarks() {
        return repo.findAll();
    }

    @GetMapping("/search")
    public List<StudentMarks> searchMarks(@RequestParam String name) {
        return repo.findByStudentNameContainingIgnoreCase(name);
    }

    @PostMapping
    @SuppressWarnings("null") // Added this line to resolve the null-safety issue
    public StudentMarks addMarks(@RequestBody StudentMarks marks) {
        return repo.save(marks);
    }
}