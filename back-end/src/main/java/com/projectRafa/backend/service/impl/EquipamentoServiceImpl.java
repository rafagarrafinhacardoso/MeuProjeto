package com.projectRafa.backend.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.projectRafa.backend.model.Equipamento;
import com.projectRafa.backend.repository.EquipamentoRepository;
import com.projectRafa.backend.service.EquipamentoService;

@Service
public class EquipamentoServiceImpl implements EquipamentoService {
	
	@Autowired
	private EquipamentoRepository equipamentoRepository;

	@Override
	public List<Equipamento> obterTodos() {
		return this.equipamentoRepository.findAll();
	}

	@Override
	public Equipamento criar(Equipamento equip) {
		System.out.println(equip.getNome() + " : " + equip.getSerialNumber() +" : "+ equip.getEquipType());
		return this.equipamentoRepository.save(equip);
	}

}
