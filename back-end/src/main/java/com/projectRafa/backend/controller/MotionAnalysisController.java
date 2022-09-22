package com.projectRafa.backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
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
	
	@GetMapping("{id}")
	public MotionAnalysis buscarporId(@PathVariable("id") String id) {
		return motionAnalysisService.buscarPorId(id).get();
	}
	
	@PostMapping("/alterar")
	public MotionAnalysis alterar(@RequestBody MotionAnalysis analy) {
		return motionAnalysisService.salvar(analy);
	}
	
	@DeleteMapping("/{id}")
	public void deletar(@PathVariable("id") String id) {
		System.out.println("Deletando" + id);
		motionAnalysisService.deletarPorId(id);
		return;
	}

}
