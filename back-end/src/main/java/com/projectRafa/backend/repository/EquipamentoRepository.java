package com.projectRafa.backend.repository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import com.projectRafa.backend.model.Equipamento;

public interface EquipamentoRepository extends MongoRepository<Equipamento, String> {
	
	@Query(value = "{}" ,fields = "{'id':1, 'serialNumber':1}")
	public List<Equipamento> findAllIdSerialNumber();

}
