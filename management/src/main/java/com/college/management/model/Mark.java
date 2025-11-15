package com.college.management.model;

import jakarta.persistence.*;

@Entity
@Table(name = "marks")
public class Mark {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String studentName;
    private String subject;
    private int marksObtained;
    private int maxMarks;

    public Mark() {}

    public Mark(String studentName, String subject, int marksObtained, int maxMarks) {
        this.studentName = studentName;
        this.subject = subject;
        this.marksObtained = marksObtained;
        this.maxMarks = maxMarks;
    }

    // -------- Getters & Setters --------
    public Long getId() {
        return id;
    }

    public String getStudentName() {
        return studentName;
    }

    public void setStudentName(String studentName) {
        this.studentName = studentName;
    }

    public String getSubject() {
        return subject;
    }

    public void setSubject(String subject) {
        this.subject = subject;
    }

    public int getMarksObtained() {
        return marksObtained;
    }

    public void setMarksObtained(int marksObtained) {
        this.marksObtained = marksObtained;
    }

    public int getMaxMarks() {
        return maxMarks;
    }

    public void setMaxMarks(int maxMarks) {
        this.maxMarks = maxMarks;
    }
}
