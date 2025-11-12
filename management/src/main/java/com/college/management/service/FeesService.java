package com.college.management.service;

import com.college.management.model.Fees;
import com.college.management.repository.FeesRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FeesService {

    private final FeesRepository repo;

    public FeesService(FeesRepository repo) {
        this.repo = repo;
    }

    public Fees save(Fees fees) {
        if (fees == null) {
            throw new IllegalArgumentException("Fees object cannot be null");
        }
        return repo.save(fees);
    }

    // FIX: Changed parameter to String and used the correct repository method
    public List<Fees> findByStudent(String studentName) { 
        return repo.findByStudentNameContainingIgnoreCase(studentName);
    }

    public List<Fees> getAll() {
        return repo.findAll();
    }

    public void delete(long id) {
        repo.deleteById(id);
    }
}