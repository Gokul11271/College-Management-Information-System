package com.college.management.service;

import com.college.management.model.Course;
import com.college.management.repository.CourseRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CourseService {
    private final CourseRepository repo;

    public CourseService(CourseRepository repo) {
        this.repo = repo;
    }

    public Course create(Course course) {
        repo.findByCourseCode(course.getCourseCode()).ifPresent(c -> {
            throw new IllegalArgumentException("Course code already exists");
        });
        return repo.save(course);
    }

    public Course update(long id, Course input) { // <-- changed Long → long
        Course existing = repo.findById(id)
                .orElseThrow(() -> new RuntimeException("Course not found"));

        existing.setCourseName(input.getCourseName());
        existing.setCredits(input.getCredits());
       

        return repo.save(existing);
    }

    public List<Course> getAll() {
        return repo.findAll();
    }

    public Course getById(long id) { // <-- changed Long → long
        return repo.findById(id)
                .orElseThrow(() -> new RuntimeException("Course not found"));
    }

    public void delete(long id) { // <-- changed Long → long
        if (!repo.existsById(id)) {
            throw new RuntimeException("Course not found");
        }
        repo.deleteById(id);
    }
}
