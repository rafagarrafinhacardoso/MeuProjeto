package com.projectRafa.backend.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.projectRafa.backend.model.MotionAnalysis;

public interface MotionAnalysisRepository extends MongoRepository<MotionAnalysis, String> {

}
