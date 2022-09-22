package com.projectRafa.backend.service;

import java.util.List;
import java.util.Optional;

import com.projectRafa.backend.model.MotionAnalysis;

public interface MotionAnalysisService {
	
	public MotionAnalysis salvar(MotionAnalysis analy);
	
	public List<MotionAnalysis> buscarTodos();
	
	public Optional<MotionAnalysis> buscarPorId(String id);
	
	public void deletarPorId(String id);

}
