package com.college.management.controller;

import com.college.management.repository.*;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.*;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/dashboard")
public class DashboardController {

    private final StudentRepository studentRepo;
    private final FacultyRepository facultyRepo;
    private final CourseRepository courseRepo;
    private final DepartmentRepository deptRepo;
    private final FeesRepository feesRepo;

    public DashboardController(StudentRepository studentRepo,
                               FacultyRepository facultyRepo,
                               CourseRepository courseRepo,
                               DepartmentRepository deptRepo,
                               FeesRepository feesRepo) {
        this.studentRepo = studentRepo;
        this.facultyRepo = facultyRepo;
        this.courseRepo = courseRepo;
        this.deptRepo = deptRepo;
        this.feesRepo = feesRepo;
    }

    @GetMapping("/summary")
    public Map<String, Object> summary() {
        Map<String, Object> m = new HashMap<>();
        m.put("totalStudents", studentRepo.count());
        m.put("totalFaculty", facultyRepo.count());
        m.put("totalCourses", courseRepo.count());
        m.put("totalDepartments", deptRepo.count());

        // courses per department (name -> count)
        Map<String, Long> coursesPerDept = deptRepo.findAll().stream()
            .collect(Collectors.toMap(
                d -> d.getName(),
                d -> courseRepo.findAll().stream()
                        .filter(c -> {
                            if (c.getFacultyInCharge() == null) return false;
                            // simple heuristic: match department name in facultyInCharge string (replace with proper FK if you use Faculty link)
                            return c.getFacultyInCharge().contains(d.getName());
                        }).count()
            ));
        m.put("coursesPerDepartment", coursesPerDept);

        // fees collected and due
        BigDecimal totalPaid = feesRepo.findAll().stream()
                .map(f -> Optional.ofNullable(f.getAmountPaid()).orElse(BigDecimal.ZERO))
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        BigDecimal totalDue = feesRepo.findAll().stream()
                .map(f -> Optional.ofNullable(f.getAmountDue()).orElse(BigDecimal.ZERO))
                .reduce(BigDecimal.ZERO, BigDecimal::add)
                .subtract(totalPaid);

        m.put("totalFeesCollected", totalPaid);
        m.put("totalFeesDue", totalDue);

        return m;
    }
}
