package com.projectRafa.backend.service;

import java.util.List;

import com.projectRafa.backend.model.MotionAnalysis;

public interface MotionAnalysisService {
	
	public MotionAnalysis salvar(MotionAnalysis analy);
	
	public List<MotionAnalysis> buscarTodos();

}
