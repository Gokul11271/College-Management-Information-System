package com.college.management.model;

import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Entity
@Table(name = "departments")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Department {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String name;

    private String description;

    // Assuming Faculty and Student entities exist in the same package
    @OneToMany
    @JoinColumn(name = "department_id")
    private List<Faculty> facultyList;

    @OneToMany
    @JoinColumn(name = "department_id")
    private List<Student> studentList;
}
