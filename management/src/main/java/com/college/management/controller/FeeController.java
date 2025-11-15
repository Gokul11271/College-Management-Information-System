package com.college.management.controller;

import com.college.management.model.Fee;
import com.college.management.service.FeeService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/fees")
@CrossOrigin(origins = "http://localhost:8080") // or wherever your frontend runs

public class FeeController {

    private final FeeService feeService;

    public FeeController(FeeService feeService) {
        this.feeService = feeService;
    }

    @GetMapping
    public List<Fee> getAllFees() {
        return feeService.getAll();
    }

    @PostMapping
    public Fee createFee(@RequestBody Fee fee) {
        return feeService.create(fee);
    }

    @DeleteMapping("/{id}")
    public void deleteFee(@PathVariable Long id) {
        feeService.delete(id);
    }
}
