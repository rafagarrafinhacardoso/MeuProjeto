package com.projectRafa.backend.service;

import java.util.List;

import com.projectRafa.backend.model.Equipamento;

public interface EquipamentoService {
	
	public List<Equipamento> obterTodos();
	
	public Equipamento criar(Equipamento equip);

}
