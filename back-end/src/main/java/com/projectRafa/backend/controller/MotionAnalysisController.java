package com.projectRafa.backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.projectRafa.backend.model.MotionAnalysis;
import com.projectRafa.backend.service.MotionAnalysisService;

@RestController
@RequestMapping("/analysis")
public class MotionAnalysisController {
	
	@Autowired
	private MotionAnalysisService motionAnalysisService;
	
	@GetMapping
	public List<MotionAnalysis> buscarTodos() {
		return motionAnalysisService.buscarTodos();
	}

}
