package com.college.management.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name = "student_marks")
public class StudentMarks {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String studentName;
    private String subject;
    private int marks;
}
