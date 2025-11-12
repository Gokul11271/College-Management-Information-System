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

    // FIX: Changed path and parameter to use studentName (String)
    @GetMapping("/student/{studentName}")
    public List<Fees> byStudent(@PathVariable String studentName) {
        return service.findByStudent(studentName);
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