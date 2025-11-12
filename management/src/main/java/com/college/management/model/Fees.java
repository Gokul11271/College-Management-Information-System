package com.college.management.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name = "fees")
public class Fees {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String studentName;
    private double totalFees;
    private double feesPaid;
    private double balanceDue;
}
