package com.college.management.model;

import jakarta.persistence.*;

@Entity
@Table(name = "fees")
public class Fee {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String studentName;
    private double totalFee;
    private double paidAmount;
    private double balance;

    // ✅ Default constructor (required by JPA)
    public Fee() {}

    // ✅ Parameterized constructor
    public Fee(String studentName, double totalFee, double paidAmount, double balance) {
        this.studentName = studentName;
        this.totalFee = totalFee;
        this.paidAmount = paidAmount;
        this.balance = balance;
    }

    // ✅ Getters and setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getStudentName() {
        return studentName;
    }

    public void setStudentName(String studentName) {
        this.studentName = studentName;
    }

    public double getTotalFee() {
        return totalFee;
    }

    public void setTotalFee(double totalFee) {
        this.totalFee = totalFee;
    }

    public double getPaidAmount() {
        return paidAmount;
    }

    public void setPaidAmount(double paidAmount) {
        this.paidAmount = paidAmount;
    }

    public double getBalance() {
        return balance;
    }

    public void setBalance(double balance) {
        this.balance = balance;
    }
}
