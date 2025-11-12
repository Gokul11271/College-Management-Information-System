package com.college.management.controller;

import com.college.management.model.StudentMarks;
import com.college.management.service.StudentMarksService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/marks")
public class StudentMarksController {

    private final StudentMarksService service;

    public StudentMarksController(StudentMarksService service) {
        this.service = service;
    }

    @PostMapping
    public ResponseEntity<StudentMarks> add(@RequestBody StudentMarks marks) {
        return ResponseEntity.ok(service.save(marks));
    }

    @GetMapping("/student/{studentId}")
    public List<StudentMarks> byStudent(@PathVariable Long studentId) {
        return service.getByStudent(studentId);
    }

    @GetMapping("/course/{courseId}")
    public List<StudentMarks> byCourse(@PathVariable Long courseId) {
        return service.getByCourse(courseId);
    }

    @GetMapping
    public List<StudentMarks> all() {
        return service.getAll();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }
}
