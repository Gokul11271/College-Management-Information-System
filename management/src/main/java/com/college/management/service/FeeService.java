package com.college.management.service;

import com.college.management.model.Fee;
import com.college.management.repository.FeeRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FeeService {

    private final FeeRepository repo;

    public FeeService(FeeRepository repo) {
        this.repo = repo;
    }

    public Fee create(Fee fee) {
        if (fee == null) {
            throw new IllegalArgumentException("Fee cannot be null");
        }
        return repo.save(fee);
    }

    public List<Fee> getAll() {
        return repo.findAll();
    }

    public void delete(Long id) {
        if (id == null) {
            throw new IllegalArgumentException("ID cannot be null");
        }
        repo.deleteById(id);
    }
}
