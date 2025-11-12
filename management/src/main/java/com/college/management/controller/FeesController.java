package com.college.management.controller;

import com.college.management.model.Fees;
import com.college.management.service.FeesService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/fees")
public class FeesController {

    private final FeesService service;

    public FeesController(FeesService service) {
        this.service = service;
    }

    @PostMapping
    public ResponseEntity<Fees> add(@RequestBody Fees fees) {
        return ResponseEntity.ok(service.save(fees));
    }

    @GetMapping("/student/{studentId}")
    public List<Fees> byStudent(@PathVariable Long studentId) {
        return service.findByStudent(studentId);
    }

    @GetMapping
    public List<Fees> all() {
        return service.getAll();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }
}
