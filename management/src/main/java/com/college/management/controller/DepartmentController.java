package com.college.management.controller;

import com.college.management.model.Department;
import com.college.management.service.DepartmentService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;
import java.util.Objects;

@RestController
@RequestMapping("/api/departments")
public class DepartmentController {

    private final DepartmentService service;

    public DepartmentController(DepartmentService service) {
        this.service = service;
    }
    @PostMapping
    public ResponseEntity<Department> create(@RequestBody Department d) {
        Department saved = service.create(d);
        return ResponseEntity.created(Objects.requireNonNull(URI.create("/api/departments/" + saved.getId()))).body(saved);
    }
    

    @GetMapping
    public List<Department> all() {
        return service.getAll();
    }

    @GetMapping("/{id}")
    public Department get(@PathVariable Long id) {
        return service.getById(id);
    }

    @PutMapping("/{id}")
    public Department update(@PathVariable Long id, @RequestBody Department d) {
        return service.update(id, d);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }
}
