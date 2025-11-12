package com.college.management.model;

import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDate;

@Entity
@Table(name = "fees")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Fees {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // related student
    @ManyToOne
    @JoinColumn(name = "student_id", nullable = false)
    private Student student;

    private BigDecimal amountDue;    // total fee charged
    private BigDecimal amountPaid;   // amount paid so far
    private LocalDate lastPaymentDate;
    private String remarks;

    public BigDecimal getBalance() {
        if (amountDue == null) amountDue = BigDecimal.ZERO;
        if (amountPaid == null) amountPaid = BigDecimal.ZERO;
        return amountDue.subtract(amountPaid);
    }
}
