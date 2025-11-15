package com.college.management.service;

import com.college.management.model.Mark;
import com.college.management.repository.MarkRepository;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class MarkService {

    private final MarkRepository repo;

    public MarkService(MarkRepository repo) {
        this.repo = repo;
    }

    public Mark create(@NonNull Mark mark) {
        return repo.save(mark);
    }

    public List<Mark> getAll() {
        return repo.findAll();
    }

    public void delete(@NonNull Long id) {
        repo.deleteById(id);
    }
}
