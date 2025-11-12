package com.college.management.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "student_marks")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class StudentMarks {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Many marks records belong to a student
    @ManyToOne
    @JoinColumn(name = "student_id", nullable = false)
    private Student student;

    // marks for a course
    @ManyToOne
    @JoinColumn(name = "course_id", nullable = false)
    private Course course;

    private Double marks; // or Integer based on your grading system

    private String grade; // optional (A, B, etc.)
}
