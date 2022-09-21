package com.projectRafa.backend.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.projectRafa.backend.model.MotionAnalysis;
import com.projectRafa.backend.repository.MotionAnalysisRepository;
import com.projectRafa.backend.service.MotionAnalysisService;

@Service
public class MotionAnalysisServiceImpl implements MotionAnalysisService {
	
	@Autowired
	private MotionAnalysisRepository motionAnalysisRepository;
	
	@Override
	public MotionAnalysis salvar(MotionAnalysis analy) {
		return motionAnalysisRepository.save(analy);
	}
	
	public List<MotionAnalysis> buscarTodos() {
		return motionAnalysisRepository.findAll();
	}

}
