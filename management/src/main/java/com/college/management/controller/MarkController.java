package com.college.management.controller;

import com.college.management.model.Mark;
import com.college.management.service.MarkService;
import org.springframework.lang.NonNull;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/marks")
@CrossOrigin(origins = "http://localhost:5173")
public class MarkController {

    private final MarkService markService;

    public MarkController(MarkService markService) {
        this.markService = markService;
    }

    @GetMapping
    public List<Mark> getMarks() {
        return markService.getAll();
    }

    @PostMapping
    public Mark create(@RequestBody @NonNull Mark mark) {
        return markService.create(mark);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable @NonNull Long id) {
        markService.delete(id);
    }
}
