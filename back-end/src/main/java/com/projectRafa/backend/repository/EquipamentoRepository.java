package com.projectRafa.backend.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.projectRafa.backend.model.Equipamento;

public interface EquipamentoRepository extends MongoRepository<Equipamento, String> {

}
