package com.college.management.service;

import com.college.management.model.Faculty;
import com.college.management.repository.FacultyRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FacultyService {

    private final FacultyRepository repo;

    public FacultyService(FacultyRepository repo) {
        this.repo = repo;
    }

    public Faculty create(Faculty faculty) {
        repo.findByEmail(faculty.getEmail()).ifPresent(f -> {
            throw new IllegalArgumentException("Email already exists");
        });
        return repo.save(faculty);
    }

    public Faculty update(long id, Faculty input) {
        Faculty f = repo.findById(id).orElseThrow(() -> new RuntimeException("Faculty not found"));
        f.setName(input.getName());
        f.setEmail(input.getEmail());
        f.setPhone(input.getPhone());
        f.setDepartment(input.getDepartment());
        f.setDesignation(input.getDesignation());
        return repo.save(f);
    }

    public List<Faculty> getAll() {
        return repo.findAll();
    }

    public Faculty getById(long id) {
        return repo.findById(id).orElseThrow(() -> new RuntimeException("Faculty not found"));
    }

    public void delete(long id) {
        repo.deleteById(id);
    }
}
