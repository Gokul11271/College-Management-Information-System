package com.college.management.service;

import com.college.management.model.Department;
import com.college.management.repository.DepartmentRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DepartmentService {

    private final DepartmentRepository repo;

    public DepartmentService(DepartmentRepository repo) {
        this.repo = repo;
    }

    public Department create(Department d) {
        repo.findByName(d.getName()).ifPresent(x -> {
            throw new IllegalArgumentException("Department already exists");
        });
        return repo.save(d);
    }

    public List<Department> getAll() {
        return repo.findAll();
    }

    public Department getById(long id) {
        return repo.findById(id).orElseThrow(() -> new RuntimeException("Department not found"));
    }

    public Department update(long id, Department input) {
        Department d = getById(id);
        d.setName(input.getName());
        d.setDescription(input.getDescription());
        // To change faculty/student assignments, update children separately or set lists here.
        return repo.save(d);
    }

    public void delete(long id) {
        repo.deleteById(id);
    }
}
