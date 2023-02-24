package com.projectRafa.backend.repository;

import java.util.Date;
import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import com.projectRafa.backend.model.Equipamento;

public interface EquipamentoRepository extends MongoRepository<Equipamento, String> {
	
	@Query(value = "{}" ,fields = "{'id':1, 'serialNumber':1}")
	public List<Equipamento> findAllIdSerialNumber();
	
//	@Query(value = "{updatedAt:{$gt:new Date(ISODate().getTime() - 1000 * 60 * 18)}}" ,fields = "{'id':1, 'serialNumber':1, 'status':1, 'nome':1, 'updatedAt':1}")
//  @Query(value = "{updatedAt:{$lt:new Date((new Date()).getTime())}}")
	@Query(value = "{updatedAt:{  $gte:  ?0 }}")
	public List<Equipamento> findAtivos(Date updatedAt);

}
