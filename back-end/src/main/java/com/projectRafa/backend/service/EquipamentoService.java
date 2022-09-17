package com.projectRafa.backend.service;

import java.util.List;
import java.util.Optional;

import com.projectRafa.backend.model.Equipamento;

public interface EquipamentoService {
	
	public List<Equipamento> obterTodos();
	
	public List<Equipamento> findAllSerialNumber();
	
	public Equipamento criar(Equipamento equip);
	
	public Optional<Equipamento> findById(String id);

}
